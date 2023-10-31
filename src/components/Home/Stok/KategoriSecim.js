import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 3,
};

const KategoriSecim = ({
  modal,
  handleCloseCategoryModal,
  handleOpenCategoryAddModal,
  handleOpenCategoryEditModal,
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={handleCloseCategoryModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="rounded-lg"
      >
        <Fade in={modal}>
          <Box sx={style} className="rounded-lg g text-white pt-6 ">
            <Typography
              variant="h6"
              component="h2"
              className=" gap-2 items-center justify-center text-2xl font-bold text-center flex flex-col w-full"
            >
              <p className="text-center font-bold mb-4 text-2xl">
                Kategori İşlemleri
              </p>
              <div className="w-full flex gap-6">
                <div
                  className="w-1/2 bg-blue-900 hover:bg-blue-800 px-5 rounded-lg cursor-pointer duration-300 text-base m-auto py-4"
                  onClick={handleOpenCategoryAddModal}
                >
                  Kategori Ekle
                </div>
                <div
                  className="w-1/2 bg-blue-900  py-4    hover:bg-blue-800 rounded-lg cursor-pointer duration-300 text-base m-auto"
                  onClick={handleOpenCategoryEditModal}
                >
                  Kategori Düzenle
                </div>
              </div>
            </Typography>
            <div className="w-full flex justify-end mt-4 gap-6">
              <button
                className="font-semibold px-4 text-sm bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                onClick={handleCloseCategoryModal}
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

export default KategoriSecim;
