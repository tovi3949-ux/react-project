import { TextField, IconButton, Box, InputAdornment } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addCommentToTicket } from "../services/comment";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useSnackbar } from "notistack";

type Inputs = {
    content: string;
};

function AddComment({ id, onAdd }: { id: string, onAdd: () => void }) {
    const {
        register,
        reset,
        handleSubmit
    } = useForm<Inputs>();
    const {enqueueSnackbar}=useSnackbar()
    const [sending, setSending] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data.content.trim()) return;
        setSending(true);
        try {
            await addCommentToTicket(Number(id), { content: data.content });
            reset();
            enqueueSnackbar('התגובה נוספה בהצלחה!', { variant: 'success' });
            onAdd();
        }
        catch (error: any) {
            enqueueSnackbar('שגיאה בשליחת התגובה', { variant: 'error' });
        }
        finally {
            setSending(false);
        }

    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}
        >
            <TextField
                placeholder="כתוב תגובה..."
                fullWidth
                multiline
                maxRows={4}
                size="small"
                {...register("content", { required: true })}
                disabled={sending}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: '#f5f5f5'
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                type="submit"
                                color="primary"
                                disabled={sending}
                                edge="end"
                            >
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}
export default AddComment;