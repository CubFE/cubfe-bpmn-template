<script setup lang="ts">
import {ref, defineProps, onUnmounted, watch, nextTick, onMounted} from "vue"
import BpmnViewer from "bpmn-js/lib/Viewer"
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import {RefreshCcw, ZoomIn, ZoomOut} from "lucide-vue-next";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {useI18n} from "vue-i18n";
import gridModule from "diagram-js-grid-bg";
import {viewerRenderer} from '@/core/bpmn/style';

const {t} = useI18n()

const props = defineProps({
  xml: {
    type: String
  },
  finishedInfo: {
    type: Object
  },
  allCommentList: {
    type: Array
  },
  hiddenZoom: {
    type: Boolean,
    default: false
  }
})

const dialogVisible = ref(false)
const dlgTitle = ref(undefined)
const defaultZoom = ref(1)
const isLoading = ref(false)
const bpmnViewer = ref(undefined)
const processNodeInfo = ref(undefined)
const selectTaskId = ref(undefined)
const taskCommentList = ref([])
const hoverTimer = ref(null)
const processCanvasRef = ref(null)
const customSuccessDefs = ref(null)
const customFailDefs = ref(null)


const processReZoom = () => {
  defaultZoom.value = 1;
  bpmnViewer.value.get('canvas').zoom('fit-viewport', 'auto');
}
const processZoomIn = (zoomStep = 0.1) => {
  let newZoom = Math.floor(defaultZoom.value * 100 + zoomStep * 100) / 100;
  if (newZoom > 4) {
    throw new Error('[Process Designer Warn ]: The zoom ratio cannot be greater than 4');
  }
  defaultZoom.value = newZoom;
  bpmnViewer.value.get('canvas').zoom(defaultZoom.value);
}
const processZoomOut = (zoomStep = 0.1) => {
  let newZoom = Math.floor(defaultZoom.value * 100 - zoomStep * 100) / 100;
  if (newZoom < 0.2) {
    throw new Error('[Process Designer Warn ]: The zoom ratio cannot be less than 0.2');
  }
  defaultZoom.value = newZoom;
  bpmnViewer.value.get('canvas').zoom(defaultZoom.value);
}

const clearViewer = () => {
  if (processCanvasRef.value) {
    processCanvasRef.value.innerHTML = '';
  }
  if (bpmnViewer.value) {
    bpmnViewer.value.destroy();
  }
  bpmnViewer.value = null;
}

const addCustomDefs = () => {
  const canvas = bpmnViewer.value.get('canvas');
  const svg = canvas._svg;

  const customSuccessDefs = document.getElementById("customSuccessDefs");
  const customFailDefs = document.getElementById("customFailDefs");
  svg.appendChild(customSuccessDefs);
  svg.appendChild(customFailDefs);
}
const onSelectElement = (element) => {
  selectTaskId.value = undefined;
  dlgTitle.value = undefined;

  if (processNodeInfo.value == null || processNodeInfo.value.finishedTaskSet == null) return;

  if (element == null || processNodeInfo.value.finishedTaskSet.indexOf(element.id) === -1) {
    return;
  }

  selectTaskId.value = element.id;
  dlgTitle.value = element.businessObject ? element.businessObject.name : undefined;
  taskCommentList.value = (props.allCommentList || []).filter(item => {
    return item.activityId === selectTaskId.value;
  });
  dialogVisible.value = true;
}
const importXML = async (xml) => {
  clearViewer();
  if (xml != null && xml !== '' && processCanvasRef.value != null) {
    try {
      bpmnViewer.value = new BpmnViewer({
        container: processCanvasRef.value,
        additionalModules: [
          // 移动整个画布
          MoveCanvasModule,
          gridModule,
          viewerRenderer
        ],
        gridLine: {
          smallGridSpacing: 20,
          gridSpacing: 80,
          gridLineStroke: .5,
          gridLineOpacity: 0.5,
          gridLineColor: 'rgba(209,209,209,0.3)'
        }
      });
      // 任务节点悬浮事件
      bpmnViewer.value.on('element.click', ({ element }) => {
        onSelectElement(element);
      });
      isLoading.value = true;
      await bpmnViewer.value.importXML(xml);
      // addCustomDefs();
    } catch (e) {
      clearViewer();
    } finally {
      isLoading.value = false;
      setProcessStatus(processNodeInfo.value);
    }
  }
}
const setProcessStatus = (processNodeInfo) => {
  if (isLoading.value || processNodeInfo == null || bpmnViewer.value == null) return;
  processNodeInfo.value = processNodeInfo;
  let { finishedTaskSet, rejectedTaskSet, unfinishedTaskSet, finishedSequenceFlowSet } = processNodeInfo.value;
  const canvas = bpmnViewer.value.get('canvas');
  const elementRegistry = bpmnViewer.value.get('elementRegistry');
  if (Array.isArray(finishedSequenceFlowSet)) {
    finishedSequenceFlowSet.forEach(item => {
      if (item != null) {
        canvas.addMarker(item, 'success');
        let element = elementRegistry.get(item);
        const conditionExpression = element.businessObject.conditionExpression;
        if (conditionExpression) {
          canvas.addMarker(item, 'condition-expression');
        }
      }
    });
  }
  if (Array.isArray(finishedTaskSet)) {
    finishedTaskSet.forEach(item => canvas.addMarker(item, 'success'));
  }
  if (Array.isArray(unfinishedTaskSet)) {
    unfinishedTaskSet.forEach(item => canvas.addMarker(item, 'primary'));
  }
  if (Array.isArray(rejectedTaskSet)) {
    rejectedTaskSet.forEach(item => {
      if (item != null) {
        let element = elementRegistry.get(item);
        if (element.type.includes('Task')) {
          canvas.addMarker(item, 'danger');
        } else {
          canvas.addMarker(item, 'warning');
        }
      }
    })
  }
}
watch(()=>props.xml, (newVal)=>{
  nextTick(()=>{
    importXML(newVal)
  })
},{immediate: true})

watch(()=>props.finishedInfo, (newVal)=>{
  setProcessStatus(newVal)
},{immediate: true})
onMounted(()=>{
  nextTick(()=>{
    processReZoom();
    setTimeout(()=>processReZoom(),500)
    setTimeout(()=>processReZoom(),500)
  })
})
onUnmounted(()=>{
  clearViewer()
})
</script>

<template>
  <div class="process-viewer h-full relative border rounded-lg">
    <div ref="processCanvasRef" class="process-canvas h-full" v-show="!isLoading"/>
    <defs id="customSuccessDefs" ref="customSuccessDefs">
      <marker id="sequenceflow-end-white-success" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="success-arrow" d="M 1 5 L 11 10 L 1 15 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
      <marker id="conditional-flow-marker-white-success" viewBox="0 0 20 20" refX="-1" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="success-conditional" d="M 0 10 L 8 6 L 16 10 L 8 14 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
    </defs>
    <defs id="customFailDefs" ref="customFailDefs">
      <marker id="sequenceflow-end-white-fail" viewBox="0 0 20 20" refX="11" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="fail-arrow" d="M 1 5 L 11 10 L 1 15 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
      <marker id="conditional-flow-marker-white-fail" viewBox="0 0 20 20" refX="-1" refY="10" markerWidth="10" markerHeight="10" orient="auto">
        <path class="fail-conditional" d="M 0 10 L 8 6 L 16 10 L 8 14 Z" style="stroke-width: 1px; stroke-linecap: round; stroke-dasharray: 10000, 1;"></path>
      </marker>
    </defs>
    <!-- 已完成节点悬浮弹窗 -->
<!--    <el-dialog class="comment-dialog" :title="dlgTitle || '审批记录'" :visible.sync="dialogVisible">-->
<!--      <el-row>-->
<!--        <el-table :data="taskCommentList" size="mini" border header-cell-class-name="table-header-gray">-->
<!--          <el-table-column label="序号" header-align="center" align="center" type="index" width="55px" />-->
<!--          <el-table-column label="候选办理" prop="candidate" width="150px" align="center"/>-->
<!--          <el-table-column label="实际办理" prop="assigneeName" width="100px" align="center"/>-->
<!--          <el-table-column label="处理时间" prop="createTime" width="140px" align="center"/>-->
<!--          <el-table-column label="办结时间" prop="finishTime" width="140px" align="center" />-->
<!--          <el-table-column label="耗时" prop="duration" width="100px" align="center"/>-->
<!--          <el-table-column label="审批意见" align="center">-->
<!--            <template slot-scope="scope">-->
<!--              {{scope.row.commentList&&scope.row.commentList[0]?scope.row.commentList[0].fullMessage:''}}-->
<!--            </template>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </el-row>-->
<!--    </el-dialog>-->
    <div class="absolute w-full bottom-2 flex justify-center" v-show="!hiddenZoom">
      <div class="rounded-lg flex items-center mx-auto gap-2 p-2 shadow-lg bg-background scale-75">
        <Button variant="secondary" size="sm" :disabled="defaultZoom < 0.2" @click="processZoomOut()">
          <span class="sr-only">ZoomOut</span>
          <ZoomOut class="h-4 w-4" />
        </Button>
        <span class="dark:text-white">{{Math.floor(defaultZoom * 10 * 10) + '%'}}</span>
        <!--      <Input :value="" class="w-16 text-center h-8 dark:text-white" disabled/>-->
        <Button variant="secondary" size="sm" :disabled="defaultZoom > 4" @click="processZoomIn()">
          <span class="sr-only">ZoomIn</span>
          <ZoomIn class="h-4 w-4" />
        </Button>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button variant="secondary" size="sm" @click="processReZoom()">
                <span class="sr-only">Center</span>
                <RefreshCcw class="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{t("model-designer.canvas.zoom-reset")}}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>