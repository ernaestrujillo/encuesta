package com.globalquark.encuesta.services;

import com.globalquark.encuesta.models.Encuesta;
import com.globalquark.encuesta.models.Opcion;
import com.globalquark.encuesta.models.Pregunta;
import com.globalquark.encuesta.pojos.Mensaje;
import com.globalquark.encuesta.repositorys.OpcionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OpcionService {
    @Autowired
    private OpcionRepository opcionRepository;

    public Opcion saveOpcion(Opcion opcion){
        return opcionRepository.save(opcion);
    }

    public List<Opcion> getOpciones(long idPregunta){
        return  opcionRepository.findByPreguntaIdPregunta(idPregunta);
    }

    public Optional<Opcion> getOpcionById(long id){
        return  opcionRepository.findById(id);
    }
    public Mensaje deleteOpcionById(long id){
        Mensaje mensaje=null;
        try {
            opcionRepository.deleteById(id);
            mensaje=new Mensaje(true,"La opción se elimino con exito");
        }catch (Exception ex){
            mensaje=new Mensaje(false,"Error al eliminar la opción");
        }
        return mensaje;
    }
}
