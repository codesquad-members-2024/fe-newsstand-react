import { Modal, notification } from "antd";
import { useState } from "react";

const SNACK_BAR_DELAY = 5000;
export const showSubscribeModal = (pressName) => {
    const instance = Modal.success({
        content: `${pressName} 언론사가 구독되었습니다.`,
    });
    setTimeout(() => {
        instance.destroy();
    }, SNACK_BAR_DELAY);
};

export const openNotification = (placement) => {
    notification.info({
        description: "구독한 언론사가 없습니다.",
        placement: placement,
    });
};
// export const App = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     const handleOk = () => {
//         setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };
//     return (
//         <>
//             <Modal
//                 title="Basic Modal"
//                 open={isModalOpen}
//                 onOk={handleOk}
//                 onCancel={handleCancel}
//             >
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//                 <p>Some contents...</p>
//             </Modal>
//         </>
//     );
// };
