import * as React from "react";
import { Modal, Button } from '@heathmont/moon-core-tw';
import Copy from './Assets/Copy';
import Cross from './Assets/Cross';

interface ShareChatModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  openModal: () => void;
}

const ShareChatModal: React.FC<ShareChatModalProps> = ({ isOpen, setIsOpen, closeModal, openModal }) => {
  return (
    <>
      <Modal open={isOpen} onClose={closeModal}>
        {/* Customizing the modal backdrop */}
        <Modal.Backdrop />

        <Modal.Panel className='bg-white shadow-lg'>
          <div className="p-4 ">
            <div className="flex justify-between">
              <h3 className="text-moon-18 text-bulma font-medium">
                Share link to chat
              </h3>
              <span className="cursor-pointer" onClick={closeModal}>
                <Cross />
              </span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-moon-sm text-trunks">
              Messages you send after creating your link won't be shared. Anyone with the URL will be able to view the shared chat.
            </p>
          </div>
          <div className="p-4 flex justify-end">
            <Button onClick={closeModal} className='bg-[#241E30] rounded-[10px] text-white '> <Copy /> Copy link</Button>
          </div>
        </Modal.Panel>
      </Modal>
    </>
  );
};

export default ShareChatModal;
