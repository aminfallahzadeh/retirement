// REACT IMPROTS
import { useState, useRef } from "react";

// RRD
import { useLocation } from "react-router-dom";

// REDUX
import { useDeleteArchiveMutation } from "@/features/archive/archiveApi";
// MUI
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done as DoneIcon, Close as CloseIcon } from "@mui/icons-material";

// library imports
import { toast } from "react-toastify";

function DeleteArchiveForm({
  setShowDeleteImageModal,
  setPreviewImage,
  selectedImageData,
}) {
  const [deleteDesc, setDeleteDesc] = useState("");

  const location = useLocation();
  const fractionPath = location.pathname === "/retirement/fraction";

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  const [deleteArchive, { isLoading: isDeletingImage }] =
    useDeleteArchiveMutation();

  // DELETE ARCHIVE IMAGE HANDLER
  const handleDeleteImage = async () => {
    try {
      const deleteImgRes = await deleteArchive({
        id: selectedImageData.id,
        attachment: "",
        contentType: "",
        archiveStructureID: "",
        insertUserID: "",
        documentID: "",
        personID,
        deleteDesc,
      }).unwrap();
      setShowDeleteImageModal(false);
      if (!fractionPath) setPreviewImage(null);
      toast.success(deleteImgRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const handleDescChange = (e) => {
    setDeleteDesc(e.target.value);
  };

  return (
    <section className="formContainer-transparent">
      <form method="POST" className="grid grid--col-1">
        <div className="inputBox__form">
          <input
            type="text"
            id="documentID"
            className="inputBox__form--input"
            value={deleteDesc}
            onChange={handleDescChange}
            required
          />
          <label className="inputBox__form--label" htmlFor="documentID">
            <span>*</span> توضیحات
          </label>
        </div>
      </form>

      <p className="paragraph-primary" style={{ textAlign: "center" }}>
        روش بارگزاری را انتخاب کنید
      </p>

      <div className="flex-row flex-center">
        <LoadingButton
          dir="ltr"
          endIcon={<DoneIcon />}
          loading={isDeletingImage}
          onClick={handleDeleteImage}
          variant="contained"
          color="success"
          disabled={!deleteDesc || deleteDesc === ""}
          sx={{ fontFamily: "IranYekan" }}
        >
          <span>بله</span>
        </LoadingButton>
        <Button
          dir="ltr"
          endIcon={<CloseIcon />}
          onClick={() => setShowDeleteImageModal(false)}
          variant="contained"
          color="error"
          sx={{ fontFamily: "IranYekan" }}
        >
          <span>خیر</span>
        </Button>
      </div>
    </section>
  );
}

export default DeleteArchiveForm;
