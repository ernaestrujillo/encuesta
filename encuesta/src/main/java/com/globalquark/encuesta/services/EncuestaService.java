package com.globalquark.encuesta.services;

import com.globalquark.encuesta.models.Encuesta;
import com.globalquark.encuesta.pojos.Mensaje;
import com.globalquark.encuesta.repositorys.EncuestaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EncuestaService {
    @Autowired
    private EncuestaRepository encuestaRepository;

    public Encuesta saveEncuesta(Encuesta encuesta){
        return encuestaRepository.save(encuesta);
    }
    public List<Encuesta> getEncuestas(){
        return encuestaRepository.findAll();
    }

    public List<Encuesta> getNombreEncuestaContaining(String nombreEncuesta){
        return encuestaRepository.findByNombreEncuestaContaining(nombreEncuesta);
    }
    public Optional<Encuesta> getEncuestaById(long id){
        return  encuestaRepository.findById(id);
    }
    public Mensaje deleteEncuestaById(long id){
        Mensaje mensaje=null;
        try {
            encuestaRepository.deleteById(id);
            mensaje=new Mensaje(true,"La encuesta se elimino con exito");
        }catch (Exception ex){
            mensaje=new Mensaje(false,"Error al eliminar la encuesta");
        }

        return mensaje;
    }
}
