export const flowableDescriptor = {
    "name": "Flowable",
    "uri": "http://flowable.org/bpmn",
    "prefix": "flowable",
    "xml": {
        "tagAlias": "lowerCase"
    },
    "associations": [],
    "types": [
        {
            "name": "InOutBinding",
            "superClass": ["Element"],
            "isAbstract": true,
            "properties": [
                {
                    "name": "source",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "sourceExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "target",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "businessKey",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "local",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "variables",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "In",
            "superClass": ["InOutBinding"],
            "meta": {
                "allowedIn": ["bpmn:CallActivity"]
            }
        },
        {
            "name": "Out",
            "superClass": ["InOutBinding"],
            "meta": {
                "allowedIn": ["bpmn:CallActivity"]
            }
        },
        {
            "name": "AsyncCapable",
            "isAbstract": true,
            "extends": ["bpmn:Activity", "bpmn:Gateway", "bpmn:Event"],
            "properties": [
                {
                    "name": "async",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "asyncBefore",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "asyncAfter",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "exclusive",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": true
                }
            ]
        },
        {
            "name": "JobPriorized",
            "isAbstract": true,
            "extends": ["bpmn:Process", "flowable:AsyncCapable"],
            "properties": [
                {
                    "name": "jobPriority",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "SignalEventDefinition",
            "isAbstract": true,
            "extends": ["bpmn:SignalEventDefinition"],
            "properties": [
                {
                    "name": "async",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                }
            ]
        },
        {
            "name": "ErrorEventDefinition",
            "isAbstract": true,
            "extends": ["bpmn:ErrorEventDefinition"],
            "properties": [
                {
                    "name": "errorCodeVariable",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "errorMessageVariable",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Error",
            "isAbstract": true,
            "extends": ["bpmn:Error"],
            "properties": [
                {
                    "name": "flowable:errorMessage",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "PotentialStarter",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "resourceAssignmentExpression",
                    "type": "bpmn:ResourceAssignmentExpression"
                }
            ]
        },
        {
            "name": "FormSupported",
            "isAbstract": true,
            "extends": ["bpmn:StartEvent", "bpmn:UserTask", "bpmn:EndEvent", "bpmn:SequenceFlow"],
            "properties": [
                {
                    "name": "formHandlerClass",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "formKey",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "formType",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "formReadOnly",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": false
                },
                {
                    "name": "formInit",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": true
                }
            ]
        },
        {
            "name": "TemplateSupported",
            "isAbstract": true,
            "extends": ["bpmn:Process", "bpmn:FlowElement"],
            "properties": [
                {
                    "name": "modelerTemplate",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Initiator",
            "isAbstract": true,
            "extends": ["bpmn:StartEvent"],
            "properties": [
                {
                    "name": "initiator",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "ScriptTask",
            "isAbstract": true,
            "extends": ["bpmn:ScriptTask"],
            "properties": [
                {
                    "name": "resultVariable",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "resource",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Process",
            "isAbstract": true,
            "extends": ["bpmn:Process"],
            "properties": [
                {
                    "name": "candidateStarterGroups",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "candidateStarterUsers",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "versionTag",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "historyTimeToLive",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "isStartableInTasklist",
                    "isAttr": true,
                    "type": "Boolean",
                    "default": true
                }
            ]
        },
        {
            "name": "EscalationEventDefinition",
            "isAbstract": true,
            "extends": ["bpmn:EscalationEventDefinition"],
            "properties": [
                {
                    "name": "escalationCodeVariable",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "FormalExpression",
            "isAbstract": true,
            "extends": ["bpmn:FormalExpression"],
            "properties": [
                {
                    "name": "resource",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Assignable",
            "extends": ["bpmn:UserTask"],
            "properties": [
                {
                    "name": "assignee",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "candidateUsers",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "candidateGroups",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "dueDate",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "followUpDate",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "priority",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "assigneeType",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "assigneeFields",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "pageId",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Sortable",
            "extends": ["bpmn:SequenceFlow"],
            "properties": [
                {
                    "name": "order",
                    "isAttr": true,
                    "type": "Integer"
                },
                {
                    "name": "pageId",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "completionRule",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "completionExpression",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Assignee",
            "supperClass": "Element",
            "meta": {
                "allowedIn": ["*"]
            },
            "properties": [
                {
                    "name": "label",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "viewId",
                    "type": "Number",
                    "isAttr": true
                }
            ]
        },
        {
            "name": "CallActivity",
            "extends": ["bpmn:CallActivity"],
            "properties": [
                {
                    "name": "calledElementBinding",
                    "isAttr": true,
                    "type": "String",
                    "default": "latest"
                },
                {
                    "name": "calledElementVersion",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "calledElementVersionTag",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "calledElementTenantId",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "caseRef",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "caseBinding",
                    "isAttr": true,
                    "type": "String",
                    "default": "latest"
                },
                {
                    "name": "caseVersion",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "caseTenantId",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "variableMappingClass",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "variableMappingDelegateExpression",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "ServiceTaskLike",
            "extends": [
                "bpmn:ServiceTask",
                "bpmn:BusinessRuleTask",
                "bpmn:SendTask",
                "bpmn:MessageEventDefinition"
            ],
            "properties": [
                {
                    "name": "expression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "class",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "delegateExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "resultVariable",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "DmnCapable",
            "extends": ["bpmn:BusinessRuleTask"],
            "properties": [
                {
                    "name": "decisionRef",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "decisionRefBinding",
                    "isAttr": true,
                    "type": "String",
                    "default": "latest"
                },
                {
                    "name": "decisionRefVersion",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "mapDecisionResult",
                    "isAttr": true,
                    "type": "String",
                    "default": "resultList"
                },
                {
                    "name": "decisionRefTenantId",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "ExternalCapable",
            "extends": ["flowable:ServiceTaskLike"],
            "properties": [
                {
                    "name": "type",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "topic",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "TaskPriorized",
            "extends": ["bpmn:Process", "flowable:ExternalCapable"],
            "properties": [
                {
                    "name": "taskPriority",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Properties",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["*"]
            },
            "properties": [
                {
                    "name": "values",
                    "type": "Property",
                    "isMany": true
                }
            ]
        },
        {
            "name": "Property",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "id",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "name",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "value",
                    "type": "String",
                    "isAttr": true
                }
            ]
        },
        {
            "name": "Button",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["bpmn:UserTask"]
            },
            "properties": [
                {
                    "name": "id",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "name",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "code",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "isHide",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "next",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "sort",
                    "type": "Integer",
                    "isAttr": true
                }
            ]
        },
        {
            "name": "Assignee",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["bpmn:UserTask"]
            },
            "properties": [
                {
                    "name": "id",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "type",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "value",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "condition",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "operationType",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "sort",
                    "type": "Integer",
                    "isAttr": true
                }
            ]
        },
        {
            "name": "Connector",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["flowable:ServiceTaskLike"]
            },
            "properties": [
                {
                    "name": "inputOutput",
                    "type": "InputOutput"
                },
                {
                    "name": "connectorId",
                    "type": "String"
                }
            ]
        },
        {
            "name": "InputOutput",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["bpmn:FlowNode", "flowable:Connector"]
            },
            "properties": [
                {
                    "name": "inputOutput",
                    "type": "InputOutput"
                },
                {
                    "name": "connectorId",
                    "type": "String"
                },
                {
                    "name": "inputParameters",
                    "isMany": true,
                    "type": "InputParameter"
                },
                {
                    "name": "outputParameters",
                    "isMany": true,
                    "type": "OutputParameter"
                }
            ]
        },
        {
            "name": "InputOutputParameter",
            "properties": [
                {
                    "name": "name",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "value",
                    "isBody": true,
                    "type": "String"
                },
                {
                    "name": "definition",
                    "type": "InputOutputParameterDefinition"
                }
            ]
        },
        {
            "name": "InputOutputParameterDefinition",
            "isAbstract": true
        },
        {
            "name": "List",
            "superClass": ["InputOutputParameterDefinition"],
            "properties": [
                {
                    "name": "items",
                    "isMany": true,
                    "type": "InputOutputParameterDefinition"
                }
            ]
        },
        {
            "name": "Map",
            "superClass": ["InputOutputParameterDefinition"],
            "properties": [
                {
                    "name": "entries",
                    "isMany": true,
                    "type": "Entry"
                }
            ]
        },
        {
            "name": "Entry",
            "properties": [
                {
                    "name": "key",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "value",
                    "isBody": true,
                    "type": "String"
                },
                {
                    "name": "definition",
                    "type": "InputOutputParameterDefinition"
                }
            ]
        },
        {
            "name": "Value",
            "superClass": ["InputOutputParameterDefinition"],
            "properties": [
                {
                    "name": "id",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "name",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "value",
                    "isBody": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Script",
            "superClass": ["InputOutputParameterDefinition"],
            "properties": [
                {
                    "name": "scriptFormat",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "resource",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "value",
                    "isBody": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Field",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "flowable:ServiceTaskLike",
                    "flowable:ExecutionListener",
                    "flowable:TaskListener",
                    "bpmn:ServiceTask"
                ]
            },
            "properties": [
                {
                    "name": "name",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "expression",
                    "type": "String"
                },
                {
                    "name": "stringValue",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "string",
                    "type": "String"
                },
                {
                    "name": "htmlVar",
                    "type": "Expression"
                }
            ]
        },
        {
            "name": "ChildField",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "id",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "name",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "type",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "required",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "readable",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "writable",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "variable",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "expression",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "datePattern",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "default",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "values",
                    "type": "Value",
                    "isMany": true
                }
            ]
        },
        {
            "name": "InputParameter",
            "superClass": ["InputOutputParameter"]
        },
        {
            "name": "OutputParameter",
            "superClass": ["InputOutputParameter"]
        },
        {
            "name": "Collectable",
            "isAbstract": true,
            "extends": ["bpmn:MultiInstanceLoopCharacteristics"],
            "superClass": ["flowable:AsyncCapable"],
            "properties": [
                {
                    "name": "collection",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "elementVariable",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "FailedJobRetryTimeCycle",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "flowable:AsyncCapable",
                    "bpmn:MultiInstanceLoopCharacteristics"
                ]
            },
            "properties": [
                {
                    "name": "body",
                    "isBody": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "ExecutionListener",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": [
                    "bpmn:Task",
                    "bpmn:ServiceTask",
                    "bpmn:UserTask",
                    "bpmn:BusinessRuleTask",
                    "bpmn:ScriptTask",
                    "bpmn:ReceiveTask",
                    "bpmn:ManualTask",
                    "bpmn:ExclusiveGateway",
                    "bpmn:SequenceFlow",
                    "bpmn:ParallelGateway",
                    "bpmn:InclusiveGateway",
                    "bpmn:EventBasedGateway",
                    "bpmn:StartEvent",
                    "bpmn:IntermediateCatchEvent",
                    "bpmn:IntermediateThrowEvent",
                    "bpmn:EndEvent",
                    "bpmn:BoundaryEvent",
                    "bpmn:CallActivity",
                    "bpmn:SubProcess",
                    "bpmn:Process"
                ]
            },
            "properties": [
                {
                    "name": "expression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "class",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "delegateExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "event",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "script",
                    "type": "Script"
                },
                {
                    "name": "fields",
                    "type": "Field",
                    "isMany": true
                }
            ]
        },
        {
            "name": "TaskListener",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["bpmn:UserTask"]
            },
            "properties": [
                {
                    "name": "expression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "class",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "delegateExpression",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "event",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "script",
                    "type": "Script"
                },
                {
                    "name": "fields",
                    "type": "Field",
                    "isMany": true
                }
            ]
        },
        {
            "name": "FormProperty",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["bpmn:StartEvent", "bpmn:UserTask"]
            },
            "properties": [
                {
                    "name": "id",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "name",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "type",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "required",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "readable",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "writable",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "variable",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "expression",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "datePattern",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "default",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "values",
                    "type": "Value",
                    "isMany": true
                },
                {
                    "name": "children",
                    "type": "ChildField",
                    "isMany": true
                },
                {
                    "name": "extensionElements",
                    "type": "bpmn:ExtensionElements",
                    "isMany": true
                }
            ]
        },
        {
            "name": "FormData",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["bpmn:StartEvent", "bpmn:UserTask"]
            },
            "properties": [
                {
                    "name": "fields",
                    "type": "FormField",
                    "isMany": true
                },
                {
                    "name": "businessKey",
                    "type": "String",
                    "isAttr": true
                }
            ]
        },
        {
            "name": "FormField",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "id",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "label",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "type",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "datePattern",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "defaultValue",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "properties",
                    "type": "Properties"
                },
                {
                    "name": "validation",
                    "type": "Validation"
                },
                {
                    "name": "values",
                    "type": "Value",
                    "isMany": true
                }
            ]
        },
        {
            "name": "Validation",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "constraints",
                    "type": "Constraint",
                    "isMany": true
                }
            ]
        },
        {
            "name": "Constraint",
            "superClass": ["Element"],
            "properties": [
                {
                    "name": "name",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "config",
                    "type": "String",
                    "isAttr": true
                }
            ]
        },
        {
            "name": "ConditionalEventDefinition",
            "isAbstract": true,
            "extends": ["bpmn:ConditionalEventDefinition"],
            "properties": [
                {
                    "name": "variableName",
                    "isAttr": true,
                    "type": "String"
                },
                {
                    "name": "variableEvent",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            "name": "Condition",
            "superClass": ["Element"],
            "meta": {
                "allowedIn": ["bpmn:SequenceFlow"]
            },
            "properties": [
                {
                    "name": "id",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "field",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "compare",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "value",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "logic",
                    "type": "String",
                    "isAttr": true
                },
                {
                    "name": "sort",
                    "type": "Integer",
                    "isAttr": true
                }
            ]
        }
    ],
    "emumerations": []
}

export const DefaultEmptyXML = (key, name, type) => {
    if (!type) type = "camunda";
    const TYPE_TARGET = {
        activiti: "http://activiti.org/bpmn",
        camunda: "http://bpmn.io/schema/bpmn",
        flowable: "http://flowable.org/bpmn"
    };
    return `
    <?xml version="1.0" encoding="UTF-8"?>
    <bpmn2:definitions 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
      xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
      xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
      xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"
      id="diagram_${key}"
      targetNamespace="${TYPE_TARGET[type]}">
      <bpmn2:process id="${key}" name="${name}" isExecutable="true">
      </bpmn2:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="${key}">
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn2:definitions>
  `;
};
