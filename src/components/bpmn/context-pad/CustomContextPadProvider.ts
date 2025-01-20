import { isEventSubProcess } from 'bpmn-js/lib/util/DiUtil';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { forEach, assign } from 'min-dash';
const LOW_PRIORITY = 400;
export default class CustomContextPad {
  constructor(
      bpmnFactory,
      commandStack,
      config,
      contextPad,
      create,
      elementFactory,
      injector,
      translate,
      appendPreview
  ) {
    this.create = create;
    this.bpmnFactory = bpmnFactory;
    this.commandStack = commandStack;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.appendPreview = appendPreview;
    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }
    contextPad.registerProvider(LOW_PRIORITY, this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      create,
      elementFactory,
      translate,
      appendPreview,
      commandStack,
      bpmnFactory,
    } = this;
    let businessObject = element.businessObject;
    function appendStart(event, element, type, options) {
      const shape = elementFactory.createShape({ type: type }, options);
      create.start(event, shape, {
        source: element,
      });
      appendPreview.cleanUp();
    }

    function append(event, element,type, options) {
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: type }, options);
        autoPlace.append(element, shape);
        appendPreview.cleanUp();
      } else {
        appendServiceTaskStart(event, element);
      }
    }
    function preview(event, element, type) {
      if (autoPlace) {
        appendPreview.create(element, type);
        return () => {
          // mouseout
          appendPreview.cleanUp();
        };
      } else {
        return null;
      }
    }
    function appendAction(group: string, type: string, className: string, title?: string, options?: object) {
      if (typeof title !== 'string') {
        options = title;
        title = translate('Append {type}', { type: type.replace(/^bpmn:/, '') });
      }
      return {
        group: group,
        className: className,
        title: title,
        action: {
          dragstart: (event, element)=>appendStart(event, element, type, options),
          click: (event, element)=>append(event, element, type, options),
          hover: (event, element)=>preview(event, element, type)
        }
      };
    }



    if (
        !is(businessObject, 'bpmn:EndEvent') &&
        !businessObject.isForCompensation &&
        !isEventType(businessObject, 'bpmn:IntermediateThrowEvent', 'bpmn:LinkEventDefinition') &&
        !isEventSubProcess(businessObject)
    ) {
      let actions = {};
      assign(actions, {
        'append.end-event': appendAction(
            'model',
            'bpmn:EndEvent',
            'bpmn-icon-end-event-none',
            translate('Append EndEvent')
        ),
        'append.gateway': appendAction(
            'model',
            'bpmn:ExclusiveGateway',
            'bpmn-icon-gateway-xor',
            translate('Append Gateway')
        ),
        'append.append-task': appendAction(
            'model',
            'bpmn:UserTask',
            'bpmn-icon-user-task',
            translate('Append UserTask')
        ),
        'append.service-task': appendAction(
            'model',
            'bpmn:ServiceTask',
            'bpmn-icon-service-task',
            translate('Append ServiceTask')
        ),
      });
      return actions;
    }
    return {};
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'commandStack',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate',
  'appendPreview',
];

function isEventType(eventBo, type, definition) {
  const isType = eventBo.$instanceOf(type);
  let isDefinition = false;

  let definitions = eventBo.eventDefinitions || [];
  forEach(definitions, function (def) {
    if (def.$type === definition) {
      isDefinition = true;
    }
  });

  return isType && isDefinition;
}