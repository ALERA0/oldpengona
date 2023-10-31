import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { Input } from "antd";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "#000E36",
  border: "2px solid #FFF",
  boxShadow: 24,
  p: 1,
};

const PasswordModal = ({
  open,
  handleClose,
  updatePassword,
  oldPassword,
  newPassword,
  setNewPassword,
  setOldPassword,
  newPassword2,
  setNewPassword2,
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="rounded-lg"
      >
        <Fade in={open}>
          <Box sx={style} className="rounded-lg  text-white pt-6 px">
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 items-center justify-center text-2xl font-bold text-center flex w-full"
            >
              <p className="text-sm my-3 text-white font-bold text-center w-1/3 flex justify-end m-auto">
                Eski Şifre:
              </p>

              <Input
                className="w-2/3 bg-white px-2 my-3"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
              />
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 items-center justify-center text-2xl font-bold text-center flex w-full"
            >
              <p className="text-sm my-3 text-white font-bold text-center w-1/3 flex justify-end m-auto">
                Yeni Şifre:
              </p>

              <Input
                className="w-2/3 bg-white px-2 my-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 items-center  justify-center text-2xl font-bold text-center flex w-full"
            >
              <p className="text-xs text-white mt-3 mb-6 font-bold text-center w-1/3 flex justify-end m-auto">
                Yeni Şifre Tekrar:
              </p>

              <Input
                className="w-2/3 bg-white px-2 mt-3 mb-6"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
                type="password"
              />
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              className="mb-4 gap-2 items-center justify-center text-2xl font-bold text-center flex w-full"
            >
              <button
                className="mx-auto text-lg mb-3 bg-blue-700 px-8 py-1 rounded-lg"
                onClick={updatePassword}
              >
                Kaydet
              </button>
              <button
                className="mx-auto text-lg mb-3 bg-red-700 px-2 py-1 rounded-lg"
                onClick={handleClose}
              >
                Kapat
              </button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PasswordModal;
