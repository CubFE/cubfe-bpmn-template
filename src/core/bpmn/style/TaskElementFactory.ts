import ElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory';
import { is } from 'bpmn-js/lib/util/ModelUtil';
class TaskElementFactory extends ElementFactory {
  constructor(bpmnFactory, moddle, translate, elementFactory) {
    super(bpmnFactory, moddle, translate);
    const backup_getDefaultSize = elementFactory.getDefaultSize;
    elementFactory.getDefaultSize = (element, di) => {
      if (element.$type && element.$type.includes('Task')) {
        return { width: 98, height: 40, rx: 25, ry: 25 };
      }
      if (element.$type && element.$type=='bpmn:SubProcess') {
        return { width: 98, height: 40, rx: 25, ry: 25 };
      }
      if (element.$type && element.$type.includes('Data')) {
        return { width: 36, height: 36, rx: 25, ry: 25 };
      }
      return backup_getDefaultSize(element, di);
    };
  }
}
TaskElementFactory.$inject = ['bpmnFactory', 'moddle', 'translate', 'elementFactory'];
export default TaskElementFactory;