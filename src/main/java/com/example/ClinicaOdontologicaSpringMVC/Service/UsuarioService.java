package com.example.ClinicaOdontologicaSpringMVC.Service;

import com.example.ClinicaOdontologicaSpringMVC.Entity.Usuario;
import com.example.ClinicaOdontologicaSpringMVC.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> usuarioBuscado= usuarioRepository.findByEmail(email);

        if(usuarioBuscado.isPresent()){
            return usuarioBuscado.get();
        }
        else{
            throw new UsernameNotFoundException("no existe el usuario :"+email) ;
        }
    }
}

