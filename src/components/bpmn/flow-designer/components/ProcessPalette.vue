<script setup lang="ts">
import {defineProps} from "vue";
import {
   Hand, SquareDashedMousePointer, BetweenVerticalStart, MoveUpRight, Circle,
  Diamond, UserCog,  PictureInPicture, Send, SatelliteDish, ScrollText, ServerCog,
  TableProperties, Database, RectangleHorizontal,Group
} from "lucide-vue-next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {assign} from "@/core/util/min-dash.ts"
import {useI18n} from "vue-i18n";

const {t} = useI18n()

const props = defineProps({
  bpmnModeler: {
    required: true,
  }
})
const createElement = (event, type, options = {}) => {
  const ElementFactory = props.bpmnModeler.get('elementFactory');
  const create = props.bpmnModeler.get('create');
  const shape = ElementFactory.createShape(assign({ type: `bpmn:${type}` }, options))
  // if (options) {
  //   shape.businessObject.di.isExpanded = options.isExpanded;
  // }
  create.start(event, shape);
}
const startTool = (event, type) => {
  if (type === 'HandTool') {
    props.bpmnModeler.get('handTool').activateHand(event);
  }
  if (type === 'LassoTool') {
    props.bpmnModeler.get('lassoTool').activateSelection(event);
  }
  if (type === 'SpaceTool') {
    props.bpmnModeler.get('spaceTool').activateSelection(event);
  }
  if (type === 'connectTool') {
    props.bpmnModeler.get('globalConnect').toggle(event);
  }
}
</script>

<template>
  <div class="p-2 bg-primary-foreground rounded-lg shadow-lg">
<!--  <h3 class="font-semibold text-center">TOOLS</h3>-->
<!--  <Separator class="my-1"/>-->
  <div class="grid grid-cols-2 gap-2 ">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="startTool($event, 'HandTool')"
                  @mousedown="startTool($event, 'HandTool')"
          >
            <Hand/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.hand")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="startTool($event, 'LassoTool')"
                  @mousedown="startTool($event, 'LassoTool')"
          >
            <SquareDashedMousePointer/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.lasso")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>

          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="startTool($event, 'SpaceTool')"
                  @mousedown="startTool($event, 'SpaceTool')"
          >
            <BetweenVerticalStart/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.space")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
             @click="startTool($event, 'connectTool')"
             @mousedown="startTool($event, 'connectTool')"
        >
          <MoveUpRight/>
        </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.connect")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

<!--  <h3 class="font-semibold text-center mt-4">Events</h3>-->
  <Separator class="my-1"/>
  <div class="grid grid-cols-2 gap-2 ">

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>

          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'StartEvent')"
                  @mousedown="createElement($event, 'StartEvent')"
          ><Circle/></Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.start-event")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'IntermediateThrowEvent')"
                  @mousedown="createElement($event, 'IntermediateThrowEvent')"
          >
            <Circle/>
            <Circle class="scale-75 absolute m-auto"/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.throw-event")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'EndEvent')"
                  @mousedown="createElement($event, 'EndEvent')"
          >
            <Circle/>
            <Circle class="scale-90 absolute m-auto"/>
            <Circle class="scale-75 absolute m-auto"/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.end-event")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'ExclusiveGateway')"
                  @mousedown="createElement($event, 'ExclusiveGateway')"
          >
            <Diamond/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.gateway")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

<!--  <h3 class="font-semibold text-center mt-4">TASKS</h3>-->
<!--  <Separator class="my-1"/>-->
  <div class="grid grid-cols-2 gap-2 ">

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'UserTask')"
                  @mousedown="createElement($event, 'UserTask')">
            <UserCog/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.user-task")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'ServiceTask')"
                  @mousedown="createElement($event, 'ServiceTask')">
            <ServerCog/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.service-task")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>


    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'ScriptTask')"
                  @mousedown="createElement($event, 'ScriptTask')">
            <ScrollText/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.script-task")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>


    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'SendTask')"
                  @mousedown="createElement($event, 'SendTask')">
            <Send/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.send-task")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'ReceiveTask')"
                  @mousedown="createElement($event, 'ReceiveTask')">
            <SatelliteDish/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.receive-task")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'SubProcess')"
                  @mousedown="createElement($event, 'SubProcess')"
          >
            <PictureInPicture/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.sub-process")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>

<!--  <h3 class="font-semibold text-center mt-4">OTHER</h3>-->
<!--  <Separator class="my-1"/>-->
  <div class="grid grid-cols-2 gap-2 ">

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'DataObject')"
                  @mousedown="createElement($event, 'DataObject')">
            <TableProperties/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.data-object")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'DataStoreReference')"
                  @mousedown="createElement($event, 'DataStoreReference')">
            <Database/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.data-store")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'Participant')"
                  @mousedown="createElement($event, 'Participant')">
            <RectangleHorizontal/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.participant")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger as-child>
          <Button class="w-10 h-10 p-2 dark:text-white" variant="ghost"
                  @click="createElement($event, 'Group')"
                  @mousedown="createElement($event, 'Group')">
            <Group/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{t("model-designer.components.group")}}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</div>
</template>

<style scoped>

</style>