import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {append as svgAppend, create as svgCreate} from 'tiny-svg';
import {Base, Shape} from 'diagram-js/lib/model';
import i18n from '@/core/plugins/i18n.ts'

export default class CustomRenderer extends BaseRenderer {
    static $inject = ['eventBus', 'overlays', 'bpmnRenderer', 'canvas'];
    private bpmnRenderer: any;
    private overlays: any;
    private tooltipInstances: any;
    private canvas: any;

    private customType = ['bpmn:StartEvent', 'bpmn:EndEvent',
        'bpmn:ExclusiveGateway', 'bpmn:ParallelGateway','bpmn:InclusiveGateway','bpmn:ComplexGateway','bpmn:EventBasedGateway',
        'bpmn:IntermediateThrowEvent', 'bpmn:IntermediateCatchEvent',
        'bpmn:Task', 'bpmn:UserTask', 'bpmn:ServiceTask','bpmn:ScriptTask','bpmn:SendTask', 'bpmn:ReceiveTask','bpmn:ManualTask','bpmn:BusinessRuleTask',
        'bpmn:SubProcess','bpmn:DataStoreReference', 'bpmn:DataObjectReference', 'bpmn:DataObject'
    ];

    constructor(eventBus: any, overlays: any, bpmnRenderer: any, canvas: any) {
        super(eventBus, 2000); // 设置优先级高于默认渲染器
        this.bpmnRenderer = bpmnRenderer;
        this.tooltipInstances = new Map(); // 用于存储节点与对应 Vue 实例的映射
        this.canvas = canvas;
    }


    canRender(element: Base): boolean {
        // 仅自定义开始节点
        if(element.type === 'bpmn:SubProcess'){
            return element.collapsed;
        } else {
            return this.customType.includes(element.type)
        }
    }

    drawShape(parentNode: any, element: Shape): SVGElement {
        let customShape;
        let outLineType = 'circle';
        // 根据节点类型动态生成形状
        switch (element.type) {
            case 'bpmn:StartEvent':
                customShape = this.createStartEventShape(parentNode);
                break;
            case 'bpmn:EndEvent':
                customShape = this.createEndEventShape(parentNode);
                break;
            case 'bpmn:ExclusiveGateway':
                outLineType = 'polygon';
                customShape = this.createGatewayShape(parentNode,'exclusive-gateway');
                break;
            case 'bpmn:ParallelGateway':
                outLineType = 'polygon';
                customShape = this.createGatewayShape(parentNode,'parallel-gateway');
                break;
            case 'bpmn:InclusiveGateway':
                outLineType = 'polygon';
                customShape = this.createGatewayShape(parentNode,'inclusive-gateway');
                break;
            case 'bpmn:ComplexGateway':
                outLineType = 'polygon';
                customShape = this.createGatewayShape(parentNode,'complex-gateway');
                break;
            case 'bpmn:EventBasedGateway':
                outLineType = 'polygon';
                customShape = this.createGatewayShape(parentNode,'event-gateway');
                break;
            case 'bpmn:IntermediateThrowEvent':
                customShape = this.createThrowEventShape(parentNode, element);
                break;
            case 'bpmn:IntermediateCatchEvent':
                customShape = this.createThrowEventShape(parentNode, element);
                break;
            case 'bpmn:Task':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'empty-task', element)
                break;
            case 'bpmn:UserTask':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'user-task', element)
                break;
            case 'bpmn:ServiceTask':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'service-task', element)
                break;
            case 'bpmn:SendTask':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'send-task', element)
                break;
            case 'bpmn:ReceiveTask':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'receive-task', element)
                break;
            case 'bpmn:ScriptTask':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'script-task', element)
                break;
            case 'bpmn:ManualTask':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'manual-task', element)
                break;
            case 'bpmn:BusinessRuleTask':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'business-task', element)
                break;
            case 'bpmn:SubProcess':
                outLineType = 'shape';
                customShape = this.createTaskShape(parentNode, 'sub-process', element)
                break;
            case 'bpmn:DataObject':
                outLineType = 'shape';
                customShape = this.createSingleShape(parentNode, 'object')
                break;
            case 'bpmn:DataObjectReference':
                outLineType = 'shape';
                customShape = this.createSingleShape(parentNode, 'data-object')
                break;
            case 'bpmn:DataStoreReference':
                outLineType = 'shape';
                customShape = this.createSingleShape(parentNode, 'data-store')
                break;
            case 'bpmn:Group':
                outLineType = 'shape';
                customShape = this.createGroup(parentNode)
                break;
            default:
                // 如果没有匹配的类型，可以使用默认渲染器
                customShape = this.bpmnRenderer.drawShape(parentNode, element);
                break;
        }
        this.resetElementBox(parentNode, element, outLineType)
        return customShape;
    }
    private resetElementBox(parentNode: any, element: any, outLineType: string){
        const box = parentNode.getBBox();
        element.width = box.width;
        element.height = box.height;
    }
    private createCircleElementShape(parentNode, customImageUrl) {
        const shape = svgCreate('image', {
            href: customImageUrl,
            x: 0,
            y: 0,
            width: 36,
            height: 36,
        });
        return shape;
    }
    private createStartEventShape(parentNode: any): SVGElement {
        const shape = this.createCircleElementShape(parentNode, '/images/bpmn/start-event.svg')
        svgAppend(parentNode, shape);
        return shape;
    }

    private createEndEventShape(parentNode: any): SVGElement {
        const shape = this.createCircleElementShape(parentNode, '/images/bpmn/start-event.svg')
        svgAppend(parentNode, shape);
        return shape;
    }


    private createSingleShape(parentNode: any, type: string): SVGElement {
        const shape = this.createCircleElementShape(parentNode,  `/images/bpmn/${type}.svg`)
        svgAppend(parentNode, shape);
        return shape;
    }

    private createGatewayShape(parentNode: any, type: string): SVGElement {
        const customImageUrl = `/images/bpmn/${type}.svg`;
        // svgAppend(parentNode, polygon);
        const shape = svgCreate('image', {
            href: customImageUrl,
            x: 0,
            y: 0,
            width: 50,
            height: 50,
        });
        svgAppend(parentNode, shape);
        return shape;
    }

    private createCircle(isFill: boolean): SVGElement {
        // 创建外层圆圈
        return svgCreate('circle', {
            cx: 18, // 圆心 X 坐标
            cy: 18, // 圆心 Y 坐标
            x: 2,
            y: 2,
            r: 18,  // 半径
            stroke: '#ff8001', // 边框颜色
            'stroke-width': 2, // 边框宽度
            fill: isFill ? '#ff8001' : 'none', // 填充颜色
        })
    }

    private createThrowEventShape(parentNode: any, element: any): SVGElement {
        const event = element.businessObject;
        // 检查事件类型和事件定义
        const eventType = element.type; // 获取事件的基本类型
        const eventDefinitions = event.eventDefinitions; // 获取事件定义
        let customImageUrl = '/images/bpmn/throw.svg'; // 自定义图片路径
        let circle = this.createCircle(false)

        // 根据事件类型和定义区分
        if (eventType === 'bpmn:IntermediateThrowEvent') {
            // 创建实心圆
            circle = this.createCircle(true)
            // 中间抛出事件：
            if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:MessageEventDefinition')) {
                customImageUrl = '/images/bpmn/message-throw.svg'; // 消息中间抛出事件
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:EscalationEventDefinition')) {
                customImageUrl = '/images/bpmn/update-throw.svg'; // 升级中间抛出事件
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:LinkEventDefinition')) {
                customImageUrl = '/images/bpmn/link-throw.svg'; // 链接中间抛出事件
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:CompensateEventDefinition')) {
                customImageUrl = '/images/bpmn/compensate-throw.svg'; // 补偿中间抛出事件
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:SignalEventDefinition')) {
                customImageUrl = '/images/bpmn/signal-throw.svg'; // 信号中间抛出事件
            }
        } else if (eventType === 'bpmn:IntermediateCatchEvent') {
            // 中间捕获事件
            if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:MessageEventDefinition')) {
                customImageUrl = '/images/bpmn/message-catch.svg'; // 消息中间捕获
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:TimerEventDefinition')) {
                customImageUrl = '/images/bpmn/timer-catch.svg'; // 定时中间捕获
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:ConditionalEventDefinition')) {
                customImageUrl = '/images/bpmn/condition-catch.svg'; // 条件中间捕获
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:LinkEventDefinition')) {
                customImageUrl = '/images/bpmn/link-catch.svg'; // 链接中间捕获
            } else if (eventDefinitions?.some((def: any) => def.$type === 'bpmn:SignalEventDefinition')) {
                customImageUrl = '/images/bpmn/signal-catch.svg'; // 信号中间捕获
            }
        }
        // 创建图片
        const image = svgCreate('image', {
            href: customImageUrl,
            x: 6,
            y: 5,
            width: 24,
            height: 24,
        });

        // 将圆圈和图片添加到父节点
        svgAppend(parentNode, circle);
        svgAppend(parentNode, image);
        return image;
    }
    private getImgByType(type: string): {
        leftImageUrl: string;
        middleImageUrl: string;
        rightImageUrl: string;
    } {
        return {
            leftImageUrl: `/images/bpmn/${type}-icon.svg`,
            middleImageUrl: `/images/bpmn/middle-rep.svg`,
            rightImageUrl: `/images/bpmn/task-right.svg`
        }
    }
    private calcWidth(textContent) {
        function getTextWidth(text, font = '12px Arial') {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            context.font = font;
            return context.measureText(text).width;
        }
        function countLettersAndDigits(text) {
            const letters = text.match(/[a-zA-Z]/g); // 匹配所有英文字母
            const digits = text.match(/\d/g);        // 匹配所有数字
            const letterCount = letters ? letters.length : 0;
            const digitCount = digits ? digits.length : 0;
            return letterCount + digitCount;
        }
        let calculatedWidth = getTextWidth(textContent);
        const countLettersAndDigit = countLettersAndDigits(textContent)
        if (countLettersAndDigit>0) {
            calculatedWidth += countLettersAndDigit * 0.5
        }
        return calculatedWidth;
    }
    private createTaskShape(parentNode: any, type: string, element: any): SVGElement {
        const t = i18n.global.t
        let title = '';
        if (element.businessObject.name == null || element.businessObject.name == "") {
            // 根据类型设置标题
            // title = t(`${type}`)
        } else {
            title = element.businessObject.name;
        }
        const {leftImageUrl, middleImageUrl, rightImageUrl} = this.getImgByType(type);
        const shapeHeight = 40;
        const capWidth = 37;
        const rightWidth = 21;

        // 左侧图片
        const leftImage = svgCreate('image', {
            href: leftImageUrl,
            x: 0,
            y: 0,
            width: capWidth,
            height: shapeHeight,
        });


        // 中间部分背景
        const middleRect = svgCreate('rect', {
            x: capWidth-1,
            y: 0,
            width: 20, // 临时宽度
            height: shapeHeight,
            fill: `url(#middlePattern)`,
            class: 'custom-task-middle',
            "pointer-events": "none",
            tabindex:"0"
        });

        // 定义平铺图案
        const defs = svgCreate('defs');
        const pattern = svgCreate('pattern', {
            id: 'middlePattern',
            patternUnits: 'userSpaceOnUse',
            width: 20,
            height: shapeHeight,
        });
        const middleImage = svgCreate('image', {
            href: middleImageUrl,
            x: 0,
            y: 0,
            width: 27.87,
            height: shapeHeight,
        });
        svgAppend(pattern, middleImage);
        svgAppend(defs, pattern);

        // 右侧图片
        const rightImage = svgCreate('image', {
            href: rightImageUrl,
            x: 120, // 临时位置
            y: 0,
            width: rightWidth,
            height: shapeHeight,
        });

        // 创建文字
        const textElement = svgCreate('text', {
            x: 0, // 临时位置
            y: shapeHeight / 2 + 4,
            fontWeight: 'bold',
            fontSize: 12,
            fill: '#000',
        });
        textElement.textContent = title;


        // 添加元素到 DOM
        svgAppend(parentNode, defs);
        svgAppend(parentNode, leftImage);
        svgAppend(parentNode, middleRect);
        svgAppend(parentNode, rightImage);
        svgAppend(parentNode, textElement);

        // 延迟计算宽度并更新位置
        const textWidth = this.calcWidth(title);
        const shapeWidth = 2 * capWidth + textWidth + 20;

        middleRect.setAttribute('width', `${shapeWidth - 2 * capWidth}`);
        rightImage.setAttribute('x', `${shapeWidth - capWidth - 2}`);
        textElement.setAttribute('x', `${capWidth + 10}`);

        return middleRect;
    }

    private createGroup(parentNode: any): SVGElement {
        // 自定义展开的子流程样式
        const rect = svgCreate('rect', {
            x: 0,
            y: 0,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            width: 200,
            height: 200,
            rx: 10,
            ry: 10,
            stroke: 'rgb(170 171 176)',
            strokeWidth: 1.5,
            fill: 'none',
            "stroke-dasharray": "10, 6, 0, 6",
            "pointer-events": "none"
        });

        svgAppend(parentNode, rect);

        return rect;
    }


    // stroke-linecap: round;
    // stroke-linejoin: round;
    // stroke: rgb(170 171 176);
    // stroke-width: 1.5px;
    // fill: none;
    // stroke-dasharray: 10, 6, 0, 6;
    // pointer-events: none;
}