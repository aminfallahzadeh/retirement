// IMPORTS
import { useState, useRef, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  AdfScannerOutlined as ScanIcon,
  DriveFolderUploadOutlined as UploadIcon,
} from "@mui/icons-material";
import { ArchiveFormProps } from "./types";
import { useInsertArchiveMutation } from "@/features/archive/archiveApi";
import { toastConfig } from "@/config/toast";
import { useSearchParams } from "react-router-dom";
import { convertToPersianNumber, convertToEnglishNumber } from "@/helper";
import { SCAN, UPLOAD } from "@/constants/const";
import { DOCUMENT_NUMBER } from "@/constants/fields";

const InsertArchiveForm = ({
  setCloseModal,
  item,
  refetch,
}: ArchiveFormProps) => {
  // STATES
  const [searchParams] = useSearchParams();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [documentID, setDocumentID] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [contentType, setContentType] = useState<string | null>(null);

  // CONSTS
  const personID = searchParams.get("personID");
  const [insertArchive, { isLoading }] = useInsertArchiveMutation();

  // HANDLERS
  const handleUploadButtonClick = () => {
    inputFileRef?.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    setContentType(file.type.split("/")[1]);

    reader.onloadend = () => {
      // Get the base64 string
      const base64String = reader.result as string;

      // Remove the prefix(data:image/png;base64)
      const base64Data = base64String?.split(",")[1];

      // Set the image state to the base64 data
      setImage(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleDocumentIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentID(e.target.value);
  };

  const onSubmit = async () => {
    const response = await insertArchive({
      personID,
      documentID: convertToEnglishNumber(documentID),
      archiveStructureID: item?.id,
      attachment: image,
      contentType,
    }).unwrap();
    setCloseModal();
    refetch();
    toastConfig.success(response.message);
  };

  // check if the image is not null then send the post request
  useEffect(() => {
    if (image !== null) {
      onSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const content = (
    <section className="flex flex-col">
      <form method="POST" className="grid grid--col-1">
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,image/tiff,image/jpeg"
        />

        <div className="inputBox__form">
          <input
            type="text"
            id="documentID"
            className="inputBox__form--input"
            value={convertToPersianNumber(documentID)}
            onChange={handleDocumentIDChange}
            required
          />
          <label className="inputBox__form--label" htmlFor="documentID">
            <span>*</span> {DOCUMENT_NUMBER}
          </label>
        </div>
      </form>

      <div className="flex justify-center items-center gap-x-5">
        <LoadingButton
          dir="ltr"
          endIcon={<ScanIcon />}
          loading={isLoading}
          variant="contained"
          color="primary"
          disabled
        >
          <span>{SCAN}</span>
        </LoadingButton>

        <LoadingButton
          dir="ltr"
          endIcon={<UploadIcon />}
          loading={isLoading}
          aria-label="upload"
          onClick={handleUploadButtonClick}
          variant="contained"
          disabled={!documentID || documentID === ""}
          color="primary"
        >
          <span>{UPLOAD}</span>
        </LoadingButton>
      </div>
    </section>
  );

  return content;
};

export default InsertArchiveForm;
