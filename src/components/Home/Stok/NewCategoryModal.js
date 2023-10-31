import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { Input } from "antd";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 2,
};

const NewCategoryModal = ({
  handleCloseCategoryAddModal,
  categoryAddModal,
  categorySelect,
  setCategorySelect,
  addNewCategory,
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={categoryAddModal}
        onClose={handleCloseCategoryAddModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={categoryAddModal}>
          <Box sx={style} className="rounded-lg g text-white pt-6 ">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex flex-col w-full"
            >
              <h2>Yeni Kategori Ekle</h2>
              <div className="w-full flex justify-center items-center gap-2">
                <label className="text-sm  font-bold text-center w-2/5 flex justify-end  items-center ">
                  Yeni Kategori :
                </label>

                <Input
                  value={categorySelect}
                  onChange={(e) => setCategorySelect(e.target.value)}
                  className="w-3/5 my-1.5"
                />
              </div>
            </Typography>
            <div className="w-full flex justify-end gap-6">
              <button
                className="font-bold px-4 bg-blue-500 py-2 rounded-lg hover:bg-blue-700 duration-200"
                onClick={addNewCategory}
                type="primary"
              >
                Kaydet
              </button>
              <button
                className="font-bold px-4 bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                onClick={handleCloseCategoryAddModal}
                type="primary"
              >
                Kapat
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewCategoryModal;
