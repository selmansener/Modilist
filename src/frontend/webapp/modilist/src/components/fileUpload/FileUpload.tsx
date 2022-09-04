import { Box, Grid, IconButton, Input, SvgIconProps, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CancelIcon from '@mui/icons-material/Cancel';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DescriptionIcon from '@mui/icons-material/Description';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface BaseFileUploadProps {
    button?: {
        icon?: React.ReactElement<SvgIconProps>;
        text?: string;
    },
    disabled?: boolean;
}

interface SingleFileUploadProps extends BaseFileUploadProps {
    onChange?: (file: File) => void;
    value?: File;
}

interface MultiFileUploadProps extends BaseFileUploadProps {
    onChange?: (files: File[]) => void;
    value?: File[];
}

export interface FileUploadProps extends BaseFileUploadProps {
    variant?: "single" | "multi";
    onChange?: (files: File | File[]) => void;
    value?: File | File[];
}

function SingleFileUpload(props: SingleFileUploadProps) {
    const { button, disabled, value, onChange } = props;
    const { t } = useTranslation();
    const [file, setFile] = useState<File>();
    const theme = useTheme();

    const handleChange = (e: React.ChangeEvent<any>) => {
        const files = e.currentTarget.files;
        if (files.length > 0) {
            setFile(files.item(0));
        }
    }

    useEffect(() => {
        if (value != file) {
            setFile(value);
        }
    }, [value]);

    useEffect(() => {
        if (onChange && file) {
            onChange(file);
        }
    }, [file]);

    return (
        <Box color={disabled ? theme.palette.text.disabled : theme.palette.primary.main}
            sx={{
                border: 1,
                borderRadius: 1,
                width: "100%",
                display: "flex"
            }}>
            <Grid container spacing={2}>
                <Typography component="label" sx={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    color: disabled ? theme.palette.text.disabled : theme.palette.primary.main
                }}>
                    <IconButton disabled={disabled} component="label">
                        {button?.icon}
                        <Input
                            disabled={disabled}
                            type="file"
                            inputProps={{
                                multiple: true
                            }}
                            sx={{
                                display: "none"
                            }}
                            onChange={handleChange}
                        />
                    </IconButton>
                    {t(button?.text as string)}
                </Typography>
            </Grid>
        </Box>
    )
}

function MultiFileUpload(props: MultiFileUploadProps) {
    const { button, disabled, value, onChange } = props;
    const { t } = useTranslation();
    const [files, setFiles] = useState<File[]>([]);
    const theme = useTheme();

    const handleChange = (e: React.ChangeEvent<any>) => {
        const _files = e.currentTarget.files;
        const selectedFiles = [];
        for (let i = 0; i < _files.length; i++) {
            const element = _files.item(i);
            selectedFiles.push(element);
        }

        setFiles(selectedFiles);
    }

    const RenderFiles = () => {
        if (!files || files.length === 0) {
            return <></>
        }

        return (
            <Grid item container xs={12}>
                {files.map(file => {
                    const mainMimeType = file.type.split("/")[0];
                    let icon;
                    switch (mainMimeType) {
                        case "image":
                            icon = <ImageIcon sx={{
                                verticalAlign: "bottom",
                                pl: 1
                            }} />
                            break;
                        case "video":
                            icon = <VideoFileIcon sx={{
                                verticalAlign: "bottom",
                                pl: 1
                            }} />
                            break;
                        case "audio":
                            icon = <AudioFileIcon sx={{
                                verticalAlign: "bottom",
                                pl: 1
                            }} />
                            break;
                        case "text":
                            icon = <DescriptionIcon sx={{
                                verticalAlign: "bottom",
                                pl: 1
                            }} />
                            break;
                        default:
                            icon = <InsertDriveFileIcon sx={{
                                verticalAlign: "bottom",
                                pl: 1
                            }} />
                            break;
                    }

                    return (<Grid key={file.name} item xs={12} display="flex" justifyContent="space-between">
                        <Box>
                            {icon}
                            <Typography color={disabled ? theme.palette.text.disabled : theme.palette.primary.main} component="span" pl={1}>
                                {file.name}
                            </Typography>
                        </Box>
                        <IconButton disabled={disabled} color="error" onClick={() => {
                            setFiles(files.filter(f => f.name !== file.name));
                        }}>
                            <CancelIcon />
                        </IconButton>
                    </Grid>)
                })}
            </Grid>
        )
    }

    useEffect(() => {
        // TODO: need a better compare to check if state changed
        if (value && value.length != files.length) {
            setFiles(value);
        }
    }, [value]);

    useEffect(() => {
        if (onChange) {
            onChange(files);
        }
    }, [files]);

    return (
        <Box
            color={disabled ? theme.palette.text.disabled : theme.palette.primary.main}
            sx={{
                border: 1,
                borderRadius: 1,
                width: "100%",
                display: "flex"
            }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Typography component="label"
                        color={disabled ? theme.palette.text.disabled : theme.palette.primary.main}
                        sx={{
                            cursor: disabled ? "not-allowed" : "pointer"
                        }}>
                        <IconButton disabled={disabled} component="label">
                            {button?.icon}
                            <Input
                                disabled={disabled}
                                type="file"
                                inputProps={{
                                    multiple: true
                                }}
                                sx={{
                                    display: "none"
                                }}
                                onChange={handleChange}
                            />
                        </IconButton>
                        {t(button?.text as string)}
                    </Typography>
                </Grid>
                <Grid item xs={8} display="flex" alignItems="center" justifyContent="flex-end" >
                    {files && files.length > 0 && <React.Fragment>
                        <Typography color={disabled ? theme.palette.text.disabled : theme.palette.primary.main}>
                            {(t("Generic.Forms.FilesSelected", { count: files.length }))}
                        </Typography>
                        <IconButton
                            disabled={disabled}
                            color="error" onClick={() => {
                                setFiles([]);
                            }}>
                            <CancelIcon />
                        </IconButton>
                    </React.Fragment>}
                </Grid>
                <RenderFiles />
            </Grid>
        </Box>
    )
}

const defaultProps: FileUploadProps = {
    button: {
        icon: <CloudUploadIcon color="primary" />,
        text: "Generic.Forms.SelectFile"
    },
    variant: "single",
}

export function FileUpload(props: FileUploadProps) {
    const { variant, value, ...restProps } = { ...defaultProps, ...props };

    return (
        <React.Fragment>
            {variant === "single" ? <SingleFileUpload value={value as File} {...restProps} /> : <MultiFileUpload value={value as File[]} {...restProps} />}
        </React.Fragment>
    )
}