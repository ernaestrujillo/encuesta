package com.globalquark.encuesta.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPregunta;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_encuesta", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Encuesta encuesta;
    private String nombrePregunta;

    @OneToMany(mappedBy = "pregunta",fetch = FetchType.LAZY)
    private List<Opcion> opciones=new ArrayList<>(0);;

    public Pregunta(Encuesta encuesta, String nombrePregunta) {
        this.encuesta = encuesta;
        this.nombrePregunta = nombrePregunta;
    }
    public Pregunta() {

    }

    public long getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(long idPregunta) {
        this.idPregunta = idPregunta;
    }

    @JsonBackReference
    public Encuesta getEncuesta() {
        return encuesta;
    }

    public void setEncuesta(Encuesta encuesta) {
        this.encuesta = encuesta;
    }

    public String getNombrePregunta() {
        return nombrePregunta;
    }

    public void setNombrePregunta(String nombrePregunta) {
        this.nombrePregunta = nombrePregunta;
    }

    @JsonManagedReference
    public List<Opcion> getOpciones() {
        return this.opciones;
    }

    public void setOpciones(List<Opcion> opciones) {
        this.opciones = opciones;
    }
}
