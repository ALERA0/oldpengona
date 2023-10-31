import React, { useEffect } from "react";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { Input } from "antd";
import { resetUpdateCategory } from "@/src/redux/slice/update-category-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../../ToastComponent";
import { useDispatch, useSelector } from "react-redux";
import { resetDeleteCategory } from "@/src/redux/slice/delete-category-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

const CategoryNameEditModal = ({
  categoryNameModal,
  handleCloseCategoryNameEditModal,
  deleteCategory,
  updateCategory,
  setCurrentcategoryName,
  currentcategoryName,
}) => {
  const { status: updateCategoryStatus, message: updateCategoryMessage } =
    useSelector((state) => state.updateCategory);
  const { status: deleteCategoryStatus } = useSelector(
    (state) => state.deleteCategory
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (updateCategoryStatus === "success") {
      showToastSuccesMessage(updateCategoryMessage);
      dispatch(resetUpdateCategory());
    } else if (updateCategoryStatus === "error") {
      showToastErrorMessage(updateCategoryMessage);
      dispatch(resetUpdateCategory());
    }
    if (deleteCategoryStatus === "success") {
      showToastSuccesMessage("Kategori Başarıyla Silindi");
      dispatch(resetDeleteCategory());
    } else if (deleteCategoryStatus === "error") {
      showToastErrorMessage("Kategori Silinemedi");
      dispatch(resetDeleteCategory());
    }
  }, [updateCategoryStatus, deleteCategoryStatus]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={categoryNameModal}
        onClose={handleCloseCategoryNameEditModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={categoryNameModal}>
          <Box sx={style} className="rounded-lg g text-white pt-6 ">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex w-full"
            >
              <label className="text-lg font-bold text-center w-3/5 flex justify-end  items-center ">
                Kategori İsmi :
              </label>

              <Input
                value={currentcategoryName}
                onChange={(e) => setCurrentcategoryName(e.target.value)}
                className="w-3/5 my-1.5"
              />
            </Typography>
            <div className="w-full flex justify-end gap-6">
              <button
                className="font-bold px-4 bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                onClick={deleteCategory}
                type="primary"
              >
                Sil
              </button>
              <button
                className="font-bold px-4 bg-blue-500 py-2 rounded-lg hover:bg-blue-700 duration-200"
                onClick={updateCategory}
                type="primary"
              >
                Kaydet
              </button>
              <button
                className="font-bold px-4 bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                onClick={handleCloseCategoryNameEditModal}
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

export default CategoryNameEditModal;
