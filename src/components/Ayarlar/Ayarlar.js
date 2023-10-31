import {
  getUserDetailProcess,
  updateUserPasswordProcess,
  updateUserProcess,
} from "@/src/api";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import delete2 from "../../../public/images/delete.png";
import Image from "next/image";
import {
  showToastErrorMessage,
  showToastSuccesMessage,
} from "../ToastComponent";
import { resetUpdateUser } from "@/src/redux/slice/update-user-slice";
import PasswordModal from "./PasswordModal";
import { resetUpdateUserPassword } from "@/src/redux/slice/update-user-password-slice";

const Ayarlar = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [passwordModal, setPasswordModal] = useState(false);

  const hanldeOpenPasswordModal = () => setPasswordModal(true);
  const hanldeClosePasswordModal = () => setPasswordModal(false);

  const { data: getUserDetailData } = useSelector(
    (state) => state.getUserDetail
  );
  const { status: updateUserStatus } = useSelector((state) => state.updateUser);
  const {
    status: updateUserPasswordStatus,
    message: updateUserPasswordMessage,
  } = useSelector((state) => state.updateUserPassword);

  useEffect(() => {
    dispatch(getUserDetailProcess());
  }, []);

  useEffect(() => {
    if (getUserDetailData) {
      setUsername(getUserDetailData.username);
      setEmail(getUserDetailData.email);
      setUserId(getUserDetailData._id);
      setImage(getUserDetailData?.userImage);
    }
  }, [getUserDetailData]);

  const updateUser = async () => {
    await dispatch(
      updateUserProcess({
        id: userId,
        username: username,
        email: email,
        userImage: image,
      })
    );
    await dispatch(getUserDetailProcess());
  };

  const handleUserImageChange = (e) => {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        // console.log("Image data:", reader.result);
        setImage(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error reading image:", error);
      };
    } else {
      console.log("No image selected");
      setImage(null);
    }
  };

  const handleDelete = () => {
    setImage("");
  };

  useEffect(() => {
    if (updateUserStatus === "success") {
      showToastSuccesMessage("Kullanıcı Bilgileri Güncellendi");
      dispatch(resetUpdateUser());
    } else if (updateUserStatus === "error") {
      showToastErrorMessage("Kullanıcı Güncellenemedi");
      dispatch(resetUpdateUser());
    }
    if (updateUserPasswordStatus === "success") {
      showToastSuccesMessage(updateUserPasswordMessage);
      dispatch(resetUpdateUserPassword());
    } else if (updateUserPasswordStatus === "error") {
      showToastErrorMessage(updateUserPasswordMessage);
      dispatch(resetUpdateUserPassword());
    }
  }, [updateUserStatus,updateUserPasswordStatus]);

  const updatePassword = async () => {
    if (newPassword == newPassword2) {
      await dispatch(
        updateUserPasswordProcess({
          id: userId,
          oldPassword: oldPassword,
          newPassword: newPassword,
        })
      );
    } else {
      showToastErrorMessage("Yeni şifreler aynı değil");
    }
  };


  return (
    <div className="w-full flex flex-col">
      <h2 className="text-center mb-4 text-3xl font-bold">
        Kullanıcı Bilgileri
      </h2>
      {image ? (
        <div className="mx-auto w-full">
          <div>
            <img
              src={image}
              alt="Ürün Resmi"
              style={{ maxWidth: "150px", maxHeight: "110px" }}
              className=" flex md:hidden mx-auto md:my-3 my-1"
            />
            <img
              src={image}
              alt="Ürün Resmi"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
              className="mx-auto md:flex hidden md:my-3 my-1"
            />
          </div>

          <div className="flex md:w-1/4 w-full mx-auto mb-3">
            <div className="mx-auto flex w-full justify-center items-center gap-2">
              <Input
                accept="image/*"
                type="file"
                onChange={handleUserImageChange}
                className="w-3/5 h-9"
              />
              <div
                onClick={handleDelete}
                className="cursor-pointer flex flex-col my-auto"
              >
                <Image src={delete2} className="mx-auto" width={20} />
                <p className="mx-auto md:text-sm text-xs">Resim Sil</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:flex grid grid-cols-6 gap-2 md:w-80 justify-center items-center mx-auto mb-6 w-full px-4 md:px-0">
          <p className="md:w-1/2  font-semibold text-end text-sm col-span-2">
            Resim Seçin :
          </p>
          <Input
            accept="image/*"
            type="file"
            onChange={handleUserImageChange}
            className=" w-full col-span-4 "
          />
        </div>
      )}
      <div className="md:flex grid grid-cols-6 gap-2 md:w-80 justify-center items-center mx-auto mb-6 w-full px-4 md:px-0">
        <p className="md:w-1/2  font-semibold text-end text-sm col-span-2">
          Kullanıcı Adı :
        </p>
        <Input
          value={username}
          className="w-full col-span-4"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="md:flex grid grid-cols-6 gap-2 md:w-80 justify-center items-center mx-auto mb-6 w-full px-4 md:px-0">
        <p className="md:w-1/2  font-semibold text-end text-sm col-span-2">
          Email :
        </p>
        <p className="w-full col-span-4" readOnly>
          {email}
        </p>
      </div>
      <button
        className="mx-auto bg-blue-900 text-white mt-6 px-2 py-1 rounded-lg"
        onClick={updateUser}
      >
        Kaydet
      </button>
      <div
        className="text-center mt-6 underline cursor-pointer hover:text-gray-700 duration-300"
        onClick={hanldeOpenPasswordModal}
      >
        Şifrenizi Değiştirin
      </div>
      <PasswordModal
        open={passwordModal}
        handleClose={hanldeClosePasswordModal}
        updatePassword={updatePassword}
        oldPassword={oldPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        setOldPassword={setOldPassword}
        newPassword2={newPassword2}
        setNewPassword2={setNewPassword2}
      />
    </div>
  );
};

export default Ayarlar;
