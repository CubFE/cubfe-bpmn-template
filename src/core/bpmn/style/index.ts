import CustomRenderer from './CustomRenderer.ts'
import ViewerRenderer from './ViewerRenderer.ts'
import TaskElementFactory from "./TaskElementFactory.ts";
import CustomDragging from "./CustomDragging.ts";
export const customRenderer  ={
    __init__: ["customRenderer"],
    customRenderer: ["type", CustomRenderer],
}
export const viewerRenderer  ={
    __init__: ["viewerRenderer"],
    viewerRenderer: ["type", ViewerRenderer],
}
export const customDragging  ={
    __init__: ["customDragging"],
    customDragging: ["type", CustomDragging],
}
export const taskElementFactory  ={
    __init__: ["taskElementFactory"],
    taskElementFactory: ["type", TaskElementFactory],
}