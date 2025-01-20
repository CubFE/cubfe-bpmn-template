import Dragging from 'diagram-js/lib/features/dragging/Dragging';

class CustomDragging extends Dragging {
  constructor(eventBus) {
    super(eventBus);

    eventBus.on('drag.move', (event) => {
      const context = event.context;
      // console.log(context.shapes)
      context.shapes.forEach((shape) => {
        // debugger
        // shape.style.opacity = 0;
      })
      // if (context && context.visual) {
      //   context.visual.style.opacity = '1'; // 禁止透明效果
      // }
    });
  }
}

CustomDragging.$inject = ['eventBus'];

export default CustomDragging;