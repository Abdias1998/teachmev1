import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineHeart } from "react-icons/ai";
import { addToFavorites } from "../../../endpoint/request";
import { useSelector } from "react-redux";

Modal.setAppElement("#root"); // Définissez l'élément racine de l'application pour react-modal

export default function Favorite({ videoId, video }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const user = useSelector((state) => state.user.user);
  const userId = user._id;
  const favorites = user?.favorites;

  const isVideoInFavorites = favorites.includes(videoId);

  const handleAddTofavorite = () => {
    addToFavorites(userId, videoId)
      .then((data) => {
        setModalContent(data); // Mettez la réponse de la requête dans le state du modalContent
        setModalIsOpen(true); // Ouvrez le modal
      })
      .catch((err) => {
        setModalContent(err.message || "Une erreur s'est produite"); // Mettez le message d'erreur dans le state du modalContent
        setModalIsOpen(true); // Ouvrez le modal
      });
  };

  return (
    <div className="tooltip">
      <AiOutlineHeart onClick={handleAddTofavorite} className="favorite-icon" />
      <span className="tooltiptextheart">Ajouter aux favoris</span>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            padding: "20px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "red",
          },
        }}
      >
        <h2>Réponse de la requête</h2>
        <p>{modalContent}</p>
        <button onClick={() => setModalIsOpen(false)}>Fermer</button>
      </Modal>
    </div>
  );
}
