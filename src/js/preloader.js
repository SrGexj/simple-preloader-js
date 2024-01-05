var MiLibreria = (function () {
    // Variables y funciones privadas
    var ovrl, prog, stat, innerImg, img, scripts, c, tot;
  
    function id(v) {
      return document.getElementById(v);
    }
  
    function resourceLoaded() {
      c += 1;
      var perc = ((100 / tot * c) << 0) + "%";
      stat.innerHTML = perc;
  
      console.log("Recursos cargados: " + c + " de " + tot);
      console.log("Último recurso cargado: " + this.src);
  
      if (c === tot) return doneLoading();
    }
  
    function doneLoading() {
      setTimeout(function () {
        ovrl.style.opacity = 0;
        setTimeout(function () {
          ovrl.style.display = "none";
        }, 1200);
      }, 1000);
    }
  
    // Función principal de carga
    function loadbar() {
      ovrl = id("overlay");
      prog = id("progress");
      stat = id("progstat");
      innerImg = id("innImg");
      img = document.images;
      scripts = document.querySelectorAll('script');
      c = 0;
      tot = img.length + scripts.length;
  
      // Filtrar los scripts para incluir solo los disponibles
      var availableScripts = Array.from(scripts).filter(function (script) {
        return script.src && !script.src.includes('owl.carousel.min.js');
      });
  
      console.log("Total de recursos a cargar: " + tot);
  
      // Cargar imágenes
      for (var i = 0; i < img.length; i++) {
        var tImg = new Image();
        tImg.onload = resourceLoaded;
        tImg.onerror = resourceLoaded;
        tImg.src = img[i].src;
      }
  
      // Cargar todos los scripts al final del cuerpo del documento
      for (var j = 0; j < availableScripts.length; j++) {
        var tScript = document.createElement('script');
        tScript.onload = resourceLoaded;
        tScript.onerror = resourceLoaded;
        tScript.src = availableScripts[j].src;
        document.body.appendChild(tScript);
      }
  
      // Agregar clase para iniciar la animación
      innerImg.classList.add('animate-innImg');
    }
  
    // Exponer la función de carga al exterior
    return {
      loadbar: loadbar
    };
  })();
  