## Guía de ejecución y pruebas con Apache JMeter

### 1. Requisitos previos

Para ejecutar este proyecto se necesita:

- Docker Desktop y Docker Compose.
- Git.
- Java JDK 21.
- Apache JMeter 5.6.3.
- Un navegador web.

### 2. Descargar el proyecto

Clonar el repositorio desde una terminal:

```bash
git clone https://github.com/kalmeida51521-pixel/Practica_haproxy.git
cd Practica_haproxy
```

### 3. Iniciar los contenedores

Abrir Docker Desktop y esperar a que el motor esté funcionando.

Desde la carpeta principal del proyecto, ejecutar:

```bash
docker compose up -d --build
```

Comprobar que los servicios estén activos:

```bash
docker compose ps
```

Deben aparecer cuatro servicios: `frontend`, `backend`, `backend2` y `haproxy`.

### 4. Comprobar la aplicación

Abrir las siguientes direcciones:

| Componente | Dirección |
|---|---|
| Aplicación React | http://localhost:8080/ |
| API FastAPI | http://localhost:8080/api/hello |
| Estadísticas de HAProxy | http://localhost:8080/stats |

### 5. Abrir las pruebas de JMeter

Descargar y descomprimir Apache JMeter 5.6.3.

En Windows, abrir PowerShell y entrar a la carpeta `bin` de JMeter:

```powershell
cd "C:\ruta\apache-jmeter-5.6.3\bin"
.\jmeter.bat
```

En la ventana de JMeter, seleccionar **File → Open** y abrir:

```text
Practica_haproxy/jmeter/Proyecto_HAProxy_Completo.jmx
```

### 6. Ejecutar los ejercicios

El archivo JMeter contiene los siguientes escenarios:

| Ejercicio | Objetivo |
|---|---|
| 01 | Prueba de carga con 10 usuarios |
| 02 | Prueba de carga con 50 usuarios |
| 03 | Prueba de carga con 100 usuarios |
| 04A | Comparación con Round Robin |
| 04B | Comparación con Least Connections |
| 05 | Tolerancia a fallos de un backend |
| 06 | Generación del reporte HTML |

Para ejecutar un ejercicio desde JMeter:

1. Deshabilitar todos los grupos de usuarios.
2. Habilitar únicamente el ejercicio deseado.
3. Guardar el plan de pruebas.
4. Limpiar los resultados anteriores.
5. Iniciar la prueba con el botón verde.
6. Revisar las estadísticas obtenidas.

Para pruebas de carga definitivas, se recomienda utilizar JMeter en modo no gráfico.

### 7. Comparar Round Robin y Least Connections

Abrir el archivo `haproxy/haproxy.cfg`.

Para utilizar Round Robin:

```text
balance roundrobin
```

Para utilizar Least Connections:

```text
balance leastconn
```

Después de modificar la configuración, ejecutar:

```bash
docker compose up -d --force-recreate haproxy
```

Ejecutar el escenario 04A o 04B según el algoritmo configurado y comparar los resultados.

### 8. Simular la caída de un servidor

Ejecutar el escenario 05 de JMeter.

Mientras se realiza la prueba, detener uno de los servidores:

```bash
docker compose stop backend2
```

Revisar el estado de los servidores en:

http://localhost:8080/stats

Comprobar si el backend restante continúa atendiendo solicitudes.

Restaurar el servidor:

```bash
docker compose start backend2
```

### 9. Generar el reporte HTML

En JMeter, habilitar únicamente el ejercicio 06, guardar el archivo `.jmx` y cerrar la interfaz.

Desde PowerShell, ubicarse en la carpeta `bin` de JMeter y ejecutar:

```powershell
.\jmeter.bat -n -t "C:\ruta\Practica_haproxy\jmeter\Proyecto_HAProxy_Completo.jmx" -l "C:\ruta\resultados.jtl" -e -o "C:\ruta\Reporte_HTML"
```

Reemplazar las rutas de ejemplo por las ubicaciones reales del computador.

El archivo de resultados y la carpeta del reporte deben ser nuevos para evitar conflictos.

Cuando finalice, abrir:

```text
Reporte_HTML/index.html
```

El reporte permite visualizar estadísticas, tiempos de respuesta, errores y gráficas de rendimiento.

### 10. Detener los contenedores

Al finalizar las pruebas:

```bash
docker compose down
```

Este comando detiene y elimina los contenedores del proyecto sin borrar los archivos del repositorio.# -Desaf-o-Balanceo-de-carga-con-HAProxy-Docker-React-FastAPI-JMeter
