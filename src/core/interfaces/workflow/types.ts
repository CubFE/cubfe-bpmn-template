export interface FormVO {
  formId: number | string;
  formName: string;
  content: string;
  remark: string;
}

export interface FormForm {
  formId: number | string | undefined;
  formName: string;
  formType: number | 0;
  formCode: string;
  content?: string;
  iconUrl?: string;
  remark: string;
}

export interface FormQuery {
  formName?: string;
}

export interface DeployVO {
  definitionId: string;
  processName: string;
  processKey: string;
  category: string;
  version: number;
  formId: string | number;
  formName: string;
  deploymentId: string;
  suspended: boolean;
  deploymentTime: string;
}
/**
 * 流程分类查询对象类型
 */
export interface CategoryQuery extends PageQuery {
  categoryName?: string;
  code?: string;
}

/**
 * 流程分类返回对象
 */
export interface CategoryVO extends BaseEntity {
  categoryId: string | number;
  categoryName: string;
  code: string;
  remark: string;
}

export interface CategoryForm {
  categoryId?: string | number;
  categoryName?: string;
  code?: string;
  remark?: string;
}


export interface ModelVO extends BaseEntity {
  modelId: string;
  modelKey: string;
  modelName: string;
  category: string;
  version: number;
  formType: number;
  formId: number | string;
  description: string;
  createTime: string;
  bpmnXml: string;
  content: string;
}

export interface ModelForm {
  modelId: string | undefined;
  modelKey: string;
  modelName: string;
  category: string;
  description: string;
  formType: number | undefined;
  formId: number | string | undefined;
  bpmnXml: string;
  newVersion: boolean;
}

export interface ModelQuery extends PageQuery {
  modelKey?: string;
  modelName?: string;
}

export interface DesignerForm {
  modelId: string;
  form: {
    processName: string;
    processKey: string;
  };
}
export interface ProcessVO extends BaseEntity {
  category: string;
  definitionId: string;
  deploymentId: string;
  deploymentTime: string;
  formId: string | number;
  formName: string;
  processKey: string;
  processName: string;
  taskId: string;
  suspended: boolean;
  version: number;
  procInsId?: string;
}

/**
 * 分页查询参数
 */
interface PageQuery {
  pageNum: number;
  pageSize: number;
}
export interface ProcessQuery extends PageQuery {
  processType: '',
  code: '',
  documentType: '',
  departId: '',
  departName: '',
  applyDate: '',
  documentStatus: ''
  state?: string;
}

export interface TaskForm {
  comment: string;
  procInsId: string;
  taskId: string;
  userId: string;
  copyUserIds: string;
  nextUserIds: string;
  vars: string;
  targetKey: string;
}

