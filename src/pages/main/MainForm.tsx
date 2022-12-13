import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Paper, Radio, RadioGroup, Snackbar, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import InputMask from 'react-input-mask'
import * as yup from 'yup';
import { register } from "../../services/zicardservice";

const validationSchema = yup.object({
    nome: yup.string().matches(/^[a-zA-Z]+$/, 'Nome deve conter apenas letras.').required('Nome é obrigátorio'),
    sobrenome: yup.string().matches(/^[a-zA-Z]+$/, 'Sobrenome deve conter apenas letras.').required('Sobrenome é obrigátorio'),
    email: yup.string().email('Deve ser um email valido exemplo@exemplo.com.').required('Email é obrigátorio'),
    celular: yup.string()
        .required("Celular é obrigatório")
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(11, "Celular deve conter 11 digitos."),
    documento: yup.string()
        .required("CPF é obrigatório")
        .transform(value => value.replace(/[^\d]/g, ''))
        .min(11, "CPF deve conter 11 digitos."),
    dataNascimento: yup.string().required('Data de Nascimento é obrigatória.'),
    senha: yup.string().required("Senha é obrigatória").min(6, "Senha deve conter no minino 6 caracteres."),
    confirmarSenha: yup.string().required("Confirmar Senha é obrigatória")
        .oneOf([yup.ref('senha')], 'As senhas tem que ser iguais.')
});

export default function MainForm() {
    const paperStyled = { padding: '30px 20px', width: 500, margin: '30px auto', display: 'flex', flexDirection: 'column' }

    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
        setOpenSuccess(false);
    };

    const handleSubmit = async (data: any, resetForm: any) => {
        await register(data).then((res) => {
            if (res.status === 200) {
                setOpenSuccess(true)
                resetForm()
            }
        }).catch(error => {
            setError(error.response.data.errors[0].message)
            setOpenError(true)
        });
    }

    const formik = useFormik({
        initialValues: {
            documento: '',
            celular: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            nome: '',
            sobrenome: '',
            dataNascimento: '',
            aceitaSms: false,
            aceitaEmail: false,
            aceitaWhatsapp: false,
            parceiroEmail: false,
            parceiroSms: false,
            parceiroWhatsApp: false,
            genero: 'm',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values, resetForm);
        },
    });

    return (
        <Box>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openError} autoHideDuration={1000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={openSuccess} autoHideDuration={1000} onClose={handleClose}>
                <Alert severity="success" onClose={handleClose} sx={{ width: '100%' }}>
                    Cadastro Realizado
                </Alert>
            </Snackbar >
            <Paper elevation={20} sx={paperStyled}  >
                <h1>Cadastrar</h1>
                <form onSubmit={formik.handleSubmit}>

                    <Box display='flex' flexDirection={'row'} >
                        <TextField
                            fullWidth
                            label="Nome"
                            name="nome"
                            sx={{ m: 1, width: '50%' }}
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                            helperText={formik.touched.nome && formik.errors.nome}
                            error={formik.touched.nome && Boolean(formik.errors.nome)}
                        />
                        <TextField
                            label="Sobrenome"
                            name="sobrenome"
                            sx={{ m: 1, width: '50%' }}
                            value={formik.values.sobrenome}
                            onChange={formik.handleChange}
                            helperText={formik.touched.sobrenome && formik.errors.sobrenome}
                            error={formik.touched.sobrenome && Boolean(formik.errors.sobrenome)}
                        />
                    </Box>

                    <Box display='flex' flexDirection={'row'}>
                        <InputMask
                            mask="999.999.999-99"
                            disabled={false}
                            onChange={formik.handleChange}
                            value={formik.values.documento}
                        >
                            <TextField
                                disabled={false}
                                name="documento"
                                type="text"
                                label='CPF'
                                sx={{ m: 1, width: '50%' }}
                                helperText={formik.touched.documento && formik.errors.documento}
                                error={formik.touched.documento && Boolean(formik.errors.documento)}
                            />
                        </InputMask>
                        <TextField
                            label="Data de Nascimento"
                            type="date"
                            name="dataNascimento"
                            InputLabelProps={{
                                shrink: true
                            }}
                            sx={{ m: 1, width: '50%' }}
                            onChange={formik.handleChange}
                            value={formik.values.dataNascimento}
                            helperText={formik.touched.dataNascimento && formik.errors.dataNascimento}
                            error={formik.touched.dataNascimento && Boolean(formik.errors.dataNascimento)}
                        />
                    </Box>

                    <Box display='flex' flexDirection={'row'} >
                        <InputMask
                            mask="(99) 999999999"
                            disabled={false}
                            value={formik.values.celular}
                            onChange={formik.handleChange}
                        >
                            <TextField
                                disabled={false}
                                name="celular"
                                type="text"
                                label='Celular'
                                sx={{ m: 1, width: '50%' }}
                                helperText={formik.touched.celular && formik.errors.celular}
                                error={formik.touched.celular && Boolean(formik.errors.celular)}
                            />
                        </InputMask>
                        <TextField
                            label="Email"
                            placeholder="email@example.com"
                            sx={{ m: 1, width: '50%' }}
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            helperText={formik.touched.email && formik.errors.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                        />
                    </Box>

                    <Box display='flex' flexDirection={'row'} >
                        <TextField
                            fullWidth
                            label="Senha"
                            name="senha"
                            sx={{ m: 1, width: '50%' }}
                            value={formik.values.senha}
                            onChange={formik.handleChange}
                            helperText={formik.touched.senha && formik.errors.senha}
                            error={formik.touched.senha && Boolean(formik.errors.senha)}
                        />
                        <TextField
                            label="Confirmar Senha"
                            sx={{ m: 1, width: '50%' }}
                            name="confirmarSenha"
                            value={formik.values.confirmarSenha}
                            onChange={formik.handleChange}
                            helperText={formik.touched.confirmarSenha && formik.errors.confirmarSenha}
                            error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
                        />
                    </Box>
                    <FormControl>
                        <FormLabel sx={{ m: 1 }} id="gender-group">Genero</FormLabel>
                        <RadioGroup
                            value={formik.values.genero}
                            name="genero"
                            onChange={formik.handleChange}
                            sx={{ m: 1, display: 'flex', flexDirection: 'row' }}
                        >
                            <FormControlLabel value="f" control={<Radio />} label="Feminino" />
                            <FormControlLabel value="m" control={<Radio />} label="Masculino" />
                            <FormControlLabel value="other" control={<Radio />} label="Não quero informar" />
                        </RadioGroup>
                    </FormControl>

                    <FormGroup sx={{ m: 1, display: 'flex', flexDirection: 'row' }}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={formik.values.aceitaEmail} onChange={formik.handleChange} name="aceitaEmail" />
                            }
                            label="Aceita Email"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={formik.values.aceitaSms} onChange={formik.handleChange} name="aceitaSms" />
                            }
                            label="Aceita Sms"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={formik.values.aceitaWhatsapp} onChange={formik.handleChange} name="aceitaWhatsapp" />
                            }
                            label="Aceita Whatsapp"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={formik.values.parceiroEmail} onChange={formik.handleChange} name="parceiroEmail" />
                            }
                            label="Parceiro Email"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={formik.values.parceiroSms} onChange={formik.handleChange} name="parceiroSms" />
                            }
                            label="Parceiro Sms"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={formik.values.parceiroWhatsApp} onChange={formik.handleChange} name="parceiroWhatsApp" />
                            }
                            label="Parceiro WhatsApp"
                        />
                    </FormGroup>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Box>
    )
}
