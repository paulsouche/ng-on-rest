import {
  DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
  DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
  DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
  DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
  DYNAMIC_FORM_CONTROL_TYPE_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_INPUT,
  DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_RATING,
  DYNAMIC_FORM_CONTROL_TYPE_SELECT,
  DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
  DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
  DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
  DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
  DynamicCheckControlModelConfig,
  DynamicColorPickerModelConfig,
  DynamicDateControlModelConfig,
  DynamicDatePickerModelConfig,
  DynamicEditorModelConfig,
  DynamicFileControlModelConfig,
  DynamicFileUploadModelConfig,
  DynamicFormArrayModelConfig,
  DynamicFormControlLayout,
  DynamicFormControlModelConfig,
  DynamicFormGroupModelConfig,
  DynamicFormValueControlModelConfig,
  DynamicInputControlModelConfig,
  DynamicInputModelConfig,
  DynamicOptionControlModelConfig,
  DynamicRadioGroupModelConfig,
  DynamicRatingModelConfig,
  DynamicSelectModelConfig,
  DynamicSliderModelConfig,
  DynamicSwitchModelConfig,
  DynamicTextAreaModelConfig,
  DynamicTimePickerModelConfig,
} from '@ng-dynamic-forms/core';

export type TNgorFormModelConfig =
  DynamicFormControlModelConfig |
  DynamicFormValueControlModelConfig<any> |
  DynamicFileControlModelConfig |
  DynamicFileUploadModelConfig |
  DynamicColorPickerModelConfig |
  DynamicCheckControlModelConfig |
  DynamicSwitchModelConfig |
  DynamicDateControlModelConfig |
  DynamicDatePickerModelConfig |
  DynamicTimePickerModelConfig |
  DynamicSliderModelConfig |
  DynamicInputControlModelConfig<any> |
  DynamicEditorModelConfig |
  DynamicTextAreaModelConfig |
  DynamicInputModelConfig |
  DynamicOptionControlModelConfig<any> |
  DynamicRadioGroupModelConfig<any> |
  DynamicSelectModelConfig<any> |
  DynamicRatingModelConfig |
  DynamicFormGroupModelConfig |
  DynamicFormArrayModelConfig;

export type TNgorFormModelType =
  typeof DYNAMIC_FORM_CONTROL_TYPE_ARRAY |
  typeof DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX |
  typeof DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP |
  typeof DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER |
  typeof DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER |
  typeof DYNAMIC_FORM_CONTROL_TYPE_EDITOR |
  typeof DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD |
  typeof DYNAMIC_FORM_CONTROL_TYPE_GROUP |
  typeof DYNAMIC_FORM_CONTROL_TYPE_INPUT |
  typeof DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP |
  typeof DYNAMIC_FORM_CONTROL_TYPE_RATING |
  typeof DYNAMIC_FORM_CONTROL_TYPE_SELECT |
  typeof DYNAMIC_FORM_CONTROL_TYPE_SLIDER |
  typeof DYNAMIC_FORM_CONTROL_TYPE_SWITCH |
  typeof DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA |
  typeof DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER;

export interface INgorFormModelControl {
  type: TNgorFormModelType;
  layout?: DynamicFormControlLayout | null | undefined;
}

export type TNgorFormModel = string | Array<TNgorFormModelConfig & INgorFormModelControl>;
