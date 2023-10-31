import React, { useEffect, useState } from "react";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryProcess,
  getAllCategoriesProcess,
  updateCategoryProcess,
} from "@/src/api";
import CategoryNameEditModal from "./CategoryNameEditModal";
import { resetDeleteCategory } from "@/src/redux/slice/delete-category-slice";
import { resetUpdateCategory } from "@/src/redux/slice/update-category-slice";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../../ToastComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 4,
};

const EditcategoryModal = ({
  categoryEditModal,
  handleCloseCategoryEditModal,
}) => {
  const handleOpenCategoryNameEditModal = () => setCategoryNameModal(true);
  const handleCloseCategoryNameEditModal = () => {
    setCategoryNameModal(false);
    setCurrentcategoryName("");
  };
  const [currentcategoryName, setCurrentcategoryName] = useState("");

  const [categoryNameModal, setCategoryNameModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const { data: getAllCategoriesData } = useSelector(
    (state) => state.getAllCategories
  );

  const { status: updateCategoryStatus } = useSelector(
    (state) => state.updateCategory
  );
  const { status: deleteCategoryStatus } = useSelector(
    (state) => state.deleteCategory
  );

  const dispatch = useDispatch();

  const handleEditCategory = async (categoryId) => {
    handleOpenCategoryNameEditModal();
    setCategoryId(categoryId);
  };

  const handleCategoryName = (category) => {
    setCurrentcategoryName(category);
  };

  const updateCategory = async () => {
    handleCloseCategoryNameEditModal();
    await dispatch(
      updateCategoryProcess({
        _id: categoryId,
        categoryName: currentcategoryName,
      })
    );
    await dispatch(getAllCategoriesProcess());

    setCurrentcategoryName("");
  };

  const deleteCategory = async () => {
    handleCloseCategoryNameEditModal();
    await dispatch(deleteCategoryProcess({ _id: categoryId }));
    await dispatch(getAllCategoriesProcess());
    setCurrentcategoryName("");
  };


  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={categoryEditModal}
        onClose={handleCloseCategoryEditModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        className="rounded-lg"
      >
        <Fade in={categoryEditModal}>
          <Box sx={style} className="rounded-lg g text-white pt-6 ">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="mb-4 gap-2 text-2xl font-bold text-center flex flex-col w-full"
            >
              <h2 className="text-xl text-blue-100">
                Düzenlemek istediğiniz kategoriyi seçiniz
              </h2>
              <div className="w-full ">
                <div className="max-h-72 overflow-y-auto">
                  {getAllCategoriesData?.map((category) => (
                    <Typography
                      key={category._id}
                      variant="body1"
                      className="border my-2 text-lg py-2 rounded-lg cursor-pointer"
                      onClick={() => {
                        handleEditCategory(category._id);
                        handleCategoryName(category.categoryName);
                      }}
                    >
                      {category.categoryName}
                    </Typography>
                  ))}
                </div>
              </div>
            </Typography>
            <div className="w-full flex justify-end gap-6">
              <button
                className="font-bold px-4 bg-red-500 py-2 rounded-lg hover:bg-red-700 duration-200"
                onClick={handleCloseCategoryEditModal}
                type="primary"
              >
                Kapat
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <CategoryNameEditModal
        categoryNameModal={categoryNameModal}
        handleCloseCategoryNameEditModal={handleCloseCategoryNameEditModal}
        setCurrentcategoryName={setCurrentcategoryName}
        updateCategory={updateCategory}
        currentcategoryName={currentcategoryName}
        deleteCategory={deleteCategory}
      />
    </div>
  );
};

export default EditcategoryModal;
