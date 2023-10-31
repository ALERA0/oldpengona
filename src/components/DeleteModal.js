import { Box, Button, Modal, Typography } from "@mui/material";

import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({ open, handleCloseDeleteModal, handleDeleteProduct,text }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p className="text-center">{text} Silmek İstediğinize Emin Misiniz?</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex justify-end gap-4 ">
              <button onClick={handleDeleteProduct} className="text-white px-4 rounded-lg py-2 bg-red-800">Sil</button>{" "}
              <button onClick={handleCloseDeleteModal} className="text-white px-4 rounded-lg py-2 bg-blue-800">İptal</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
