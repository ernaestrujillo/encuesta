package com.globalquark.encuesta.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Encuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEncuesta;
    private String nombreEncuesta;

    @OneToMany(mappedBy = "encuesta",fetch = FetchType.LAZY)
    private List<Pregunta> preguntas;

    public Encuesta() {

    }
    public Encuesta(String nombreEncuesta) {
        this.nombreEncuesta = nombreEncuesta;
    }

    public Encuesta(String nombreEncuesta, List<Pregunta> preguntas) {
        this.nombreEncuesta = nombreEncuesta;
        this.preguntas = preguntas;
    }

    public long getIdEncuesta() {
        return idEncuesta;
    }

    public void setIdEncuesta(long idEncuesta) {
        this.idEncuesta = idEncuesta;
    }

    public String getNombreEncuesta() {
        return nombreEncuesta;
    }

    public void setNombreEncuesta(String nombreEncuesta) {
        this.nombreEncuesta = nombreEncuesta;
    }

    @JsonManagedReference
    @JsonIgnore
    public List<Pregunta> getPreguntas() {
        return this.preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }
}
