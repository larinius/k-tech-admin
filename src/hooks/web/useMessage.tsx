import type { ModalFuncProps } from 'antd';
import { message, Modal } from 'antd';
import { getIntlText } from '@/locales';

function createElMessageBox(messageText: string, title: string, options: ModalFuncProps) {
  Modal.error({ title, content: messageText, ...options });
}

function createSuccessMessageBox(messageText: string, title: string, options: ModalFuncProps) {
  Modal.success({ title, content: messageText, ...options });
}

export function createErrorModal(msg: string) {
  createElMessageBox(msg, getIntlText('api.errorTip'), { centered: true });
}

export function createErrorMsg(msg: string) {
  message.error(msg);
}

export function createSuccessModal(msg: string) {
  createSuccessMessageBox(msg, getIntlText('api.successTip'), { centered: true });
}

export function createSuccessMsg(msg: string) {
  message.success(msg);
}

export function useMessage() {
  return {
    createErrorModal,
    createErrorMsg,
    createSuccessModal,
    createSuccessMsg,
  };
}
