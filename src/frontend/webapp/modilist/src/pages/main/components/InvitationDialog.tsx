import * as React from "react";
import { Button, Grid, Paper, Portal, Typography, useTheme, FormControl, TextField, Stack, Snackbar, DialogContent, Alert } from "@mui/material";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect } from "react";
import { FormikState, useFormik } from 'formik';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store/store";
import * as Yup from "yup";

export interface InvitationDialogProps {
  openDialog: boolean;
  onClose: () => void;
}

export function InvitationDialog(props: InvitationDialogProps) {
  const { onClose, openDialog } = props;
  const { t } = useTranslation();
  const { isBusy: sendInvitationEmailsIsBusy, data: sendInvitationEmails, status: sendInvitationEmailsStatus } = useSelector((state: RootState) => state.sendInvitationEmailsModel);
  const dispatch = useDispatch<Dispatch>();
  const { isBusy: getAccountIsBusy, data: account, status } = useSelector((state: RootState) => state.getAccountModel);
  const isBusy = getAccountIsBusy && sendInvitationEmailsIsBusy;
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const schema = Yup.array().of(Yup.string().email(t("FormValidation.Email")).notOneOf([account?.email], t("Pages.Main.InvitationOwnMailError")));

  const {
    handleBlur,
    touched,
    errors,
    values,
    setFieldValue,
    submitForm,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    validateOnBlur: true,
    initialValues: ["", "", "", "", ""],
    validationSchema: schema,
    onSubmit: (values) => {
      if (!sendInvitationEmailsIsBusy) {
        var emailsNotEmpty = values.filter(email => email !== '');
        dispatch.sendInvitationEmailsModel.sendInvitationEmails({ emails: emailsNotEmpty });
      }
    },
  });
  useEffect(() => {
    if (sendInvitationEmailsStatus === 200) {
      resetForm();
      setIsSuccess(true);
    }
    else if (sendInvitationEmailsStatus !== 200 && sendInvitationEmailsStatus !== 0) {
      setSnackbarStatus(true);
      setIsSuccess(false);
    }
    if (sendInvitationEmailsStatus !== 0) {
      dispatch.sendInvitationEmailsModel.RESET();
    }
  }, [sendInvitationEmailsStatus]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess])


  return (
    <Dialog fullWidth maxWidth="md" open={openDialog} onClose={() => {
      onClose();
    }}>
      <DialogTitle>{t('Pages.Main.SendInvitation')}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{
          my: [1]
        }}>
          {values.map((email: string, index: number) => {
            return (
              <Grid item key={index} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    name={index.toString()}
                    label={t('Pages.Main.EnterEmail')}
                    type="email"
                    value={email}
                    disabled={isBusy}
                    error={touched[index] && errors[index] !== undefined}
                    helperText={touched[index] && errors[index]}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      setFieldValue(index.toString(), e.target.value);
                    }}>
                  </TextField>
                </FormControl>
              </Grid>
            )
          })}
          <Grid item xs={12} display="flex" justifyContent="space-between"
            alignItems="center">
            <Button variant="outlined" onClick={() => {
              setFieldValue(values.length.toString(), "");
            }}>
              {t("Generic.Forms.Add")}
            </Button>
            <Button variant="contained" color="secondary" disabled={isBusy} onClick={() => {
              submitForm();
              setIsSuccess(false);
            }}>
              {t("Generic.Forms.Send")}
            </Button>
            <Portal>
              <Snackbar
                open={snackbarStatus}
                autoHideDuration={6000}
                onClose={() => {
                  setSnackbarStatus(false);
                }}>
                <Alert onClose={() => {
                  setSnackbarStatus(false);
                }}
                  severity="error"
                  variant="filled"
                  sx={{ width: '100%' }}>
                  {t(`Generic.Forms.SentMessageFailed`)}
                </Alert>
              </Snackbar>
            </Portal>

          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );

}
