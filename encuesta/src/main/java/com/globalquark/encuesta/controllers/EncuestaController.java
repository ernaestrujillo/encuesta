package com.globalquark.encuesta.controllers;

import com.globalquark.encuesta.models.Encuesta;
import com.globalquark.encuesta.models.Opcion;
import com.globalquark.encuesta.models.Pregunta;
import com.globalquark.encuesta.pojos.Mensaje;
import com.globalquark.encuesta.services.EncuestaService;
import com.globalquark.encuesta.services.OpcionService;
import com.globalquark.encuesta.services.PreguntaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EncuestaController {

    @Autowired
    private EncuestaService encuestaService;
    @Autowired
    private PreguntaService preguntaService;
    @Autowired
    private OpcionService opcionService;

    @PostMapping("/saveEncuesta")
    public Encuesta saveEncuesta(@RequestBody Encuesta encuesta){
        return encuestaService.saveEncuesta(encuesta);
    }

    @PostMapping("/savePregunta")
    public Pregunta savePregunta(@RequestBody Pregunta pregunta){
        return preguntaService.savePregunta(pregunta);
    }

    @PostMapping("/saveOpcion")
    public Opcion saveOpcion(@RequestBody Opcion opcion){
        return opcionService.saveOpcion(opcion);
    }

    @GetMapping("/encuestas")
    public List<Encuesta> encuestas(){
        return encuestaService.getEncuestas();
    }

    @GetMapping("/buscarEncuestas/{nombre}")
    public List<Encuesta> buscarEncuestas(@PathVariable String nombre){
        return encuestaService.getNombreEncuestaContaining(nombre);
    }

    @GetMapping("/encuesta/{id}")
    public Optional<Encuesta> encuesta(@PathVariable long id){
        return encuestaService.getEncuestaById(id);
    }

    @GetMapping("/preguntas/{id}")
    public List<Pregunta> preguntas(@PathVariable long id){
        return preguntaService.getPreguntas(id);
    }

    @GetMapping("/pregunta/{id}")
    public Optional<Pregunta> pregunta(@PathVariable long id){
        return preguntaService.getPreguntaById(id);
    }

    @GetMapping("/opciones/{id}")
    public List<Opcion> opciones(@PathVariable long id){
        return opcionService.getOpciones(id);
    }

    @GetMapping("/opcion/{id}")
    public Optional<Opcion> opcion(@PathVariable long id){
        return opcionService.getOpcionById(id);
    }

    @DeleteMapping("/encuesta/{id}")
    public Mensaje deleteEncuesta(@PathVariable long id){
        return encuestaService.deleteEncuestaById(id);
    }

    @DeleteMapping("/pregunta/{id}")
    public Mensaje deletePregunta(@PathVariable long id){
        return preguntaService.deletePreguntaById(id);
    }

    @DeleteMapping("/opcion/{id}")
    public Mensaje deleteOpcion(@PathVariable long id){
        return opcionService.deleteOpcionById(id);
    }
}
