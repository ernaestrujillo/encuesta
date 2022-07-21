package com.globalquark.encuesta.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
public class Opcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idOpcion;
    @ManyToOne
    @JoinColumn(name = "id_pregunta", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Pregunta pregunta;
    private String nombreOpcion;

    public Opcion() {

    }

    public Opcion(Pregunta pregunta, String nombreOpcion) {
        this.pregunta = pregunta;
        this.nombreOpcion = nombreOpcion;
    }

    public long getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(long idOpcion) {
        this.idOpcion = idOpcion;
    }

    @JsonBackReference
    public Pregunta getPregunta() {
        return pregunta;
    }

    public void setPregunta(Pregunta pregunta) {
        this.pregunta = pregunta;
    }

    public String getNombreOpcion() {
        return nombreOpcion;
    }

    public void setNombreOpcion(String nombreOpcion) {
        this.nombreOpcion = nombreOpcion;
    }
}
