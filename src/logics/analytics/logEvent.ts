import { PaintCanvas } from 'sym-paint'
import { ModalName } from '../../stores/AppStore'
import { ExportImgKind } from '../canvas/useExportImgs'

type ToolName = InstanceType<typeof PaintCanvas>['tool']

type ToolEvent = {
  category: 'tool'
  action: 'tool-change' 
  value: ToolName
}

type ToolSettingOnOffEvent = {
  category: 'tool'
  action: 'tool-eraser' | 'tool-2nd' | 'tool-kaleido'
  value: 'on' | 'off'
}

type ModalEvent = {
  category: 'modal'
  action: 'modal-open'
  value: NonNullable<ModalName>
}

type ExportEvent = {
  category: 'export'
  action: 'export-copy' | 'export-share'
  value: ExportImgKind
}

type PaintActionEvent = {
  category: 'paintAction'
  action: 'undo' | 'clear' | 'stroke'
  value: ''
}

type CustomErrorEvent = {
  category: 'customError'
  action: string,
  value: string
}

type EventEntry = ToolEvent | ModalEvent | ExportEvent | PaintActionEvent | CustomErrorEvent | ToolSettingOnOffEvent

export const logEvent = (ent: EventEntry) => {
  gtag("event", `${ent.action}${ent.value ? '-' + ent.value : ''}`, {event_categoy: ent.category, event_action: ent.action, event_label: ent.value})
  console.log(ent)
}

export const logToolEvent = (tool: ToolName) => logEvent({category: 'tool', action: 'tool-change', value: tool})
export const logToolSettingEvent = (setting: ToolSettingOnOffEvent['action'], value: boolean) => logEvent({category: 'tool', action: setting, value: value ? 'on' : 'off'})
export const logModalEvent = (modal: NonNullable<ModalName>) => logEvent({category: 'modal', action: 'modal-open', value: modal})
export const logExportEvent = (action: 'export-copy' | 'export-share', kind: ExportImgKind) => logEvent({category: 'export', action, value: kind})
export const logPaintEvent = (action: 'undo' | 'clear' | 'stroke') => logEvent({category: 'paintAction', action, value: ''})
export const logCustomErrorEvent = (module: string, error: string) => logEvent({category: 'customError', action: module, value: error})
