import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import "./modalUserData.css";

const style = {
  position: "absolute" as "absolute",
  top: "25%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const user = localStorage.getItem("user");
export default function ProfileModal({setCurrentUser}) {
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleOpen = () => {
    setOpen(true);
  };
  async function handleClose() {
    try {
      const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_REACT_APP_API_URL}/profile/update`,
        data: { user, name, email, password },
    });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        console.log("asdfasdasdasd",response.data);
        
        setName(response.data.name)
        setEmail(response.data.email)
        setOpen(false);
        setCurrentUser(response.data)
      } else {
        console.error("Ошибка при получении данных Modal-Profile");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Изменить данные</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }} className="profile-modal">
          <input
            className="profile-modal-input"
            type="text"
            placeholder="Имя"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="profile-modal-input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="profile-modal-input"
            type="text"
            placeholder="Пароль"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="profile-modal-button" onClick={handleClose}>
            Отправить
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
