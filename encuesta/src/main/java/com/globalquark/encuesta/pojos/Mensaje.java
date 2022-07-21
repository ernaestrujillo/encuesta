package com.globalquark.encuesta.pojos;

public class Mensaje {
    private boolean Exito;
    private String mensaje;

    public Mensaje(boolean exito, String mensaje) {
        Exito = exito;
        this.mensaje = mensaje;
    }

    public boolean isExito() {
        return Exito;
    }

    public void setExito(boolean exito) {
        Exito = exito;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
