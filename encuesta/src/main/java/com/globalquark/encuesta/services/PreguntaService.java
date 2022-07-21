package com.globalquark.encuesta.services;

import com.globalquark.encuesta.models.Encuesta;
import com.globalquark.encuesta.models.Pregunta;
import com.globalquark.encuesta.pojos.Mensaje;
import com.globalquark.encuesta.repositorys.PreguntaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PreguntaService {
    @Autowired
    private PreguntaRepository preguntaRepository;

    public Pregunta savePregunta(Pregunta pregunta){
        return preguntaRepository.save(pregunta);
    }

    public List<Pregunta> getPreguntas(long idEncuesta){
        return preguntaRepository.findByEncuestaIdEncuesta(idEncuesta);
    }

    public Optional<Pregunta> getPreguntaById(long id){
        return  preguntaRepository.findById(id);
    }

    public Mensaje deletePreguntaById(long id){
        Mensaje mensaje=null;
        try{
            preguntaRepository.deleteById(id);
            mensaje=new Mensaje(true,"La pregunta se elimino con exito");
        }catch (Exception ex){
            mensaje=new Mensaje(false,"Error al eliminar la pregunta");
        }
        return mensaje;
    }

}
