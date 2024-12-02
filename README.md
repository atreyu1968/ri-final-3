# Innovation Network Manager

Sistema de gestión para redes de innovación en formación profesional.

## Servicios Integrados

### Aplicación Principal
- URL: https://redinnovacionfp.es
- Panel de administración: /admin
- Base de datos: MariaDB 10.11
- Gestor de BD: phpMyAdmin

### Chat (Rocket.Chat)
- URL: https://redinnovacionfp.es/chat
- Configuración en panel de administración
- SSO habilitado con la plataforma principal

### Foro (Discourse)
- URL: https://redinnovacionfp.es/forum
- Configuración en panel de administración
- SSO habilitado con la plataforma principal

### Espacio Colaborativo (Nextcloud)
- URL: https://redinnovacionfp.es/nextcloud
- Configuración en panel de administración
- SSO habilitado con la plataforma principal

### Videoconferencias (Jitsi Meet)
- URL: https://redinnovacionfp.es/meet
- Configuración en panel de administración
- No requiere instalación

## Requisitos del Sistema

### Producción
- CPU: 4 cores mínimo
- RAM: 8GB mínimo
- Almacenamiento: 50GB mínimo
- Sistema Operativo: Debian 11 o superior
- Docker 24.x o superior
- Docker Compose 2.x o superior

### Desarrollo
- Node.js 20.x o superior
- NPM 10.x o superior
- MariaDB 10.11 o superior

## Instalación en Producción

1. Clonar el repositorio:
```bash
git clone https://github.com/your-username/innovation-network.git
cd innovation-network
```

2. Configurar variables de entorno:
```bash
cp .env.example .env.production
# Editar .env.production con los valores correctos
```

3. Generar certificados SSL:
```bash
certbot certonly --standalone -d redinnovacionfp.es
```

4. Ejecutar script de despliegue:
```bash
chmod +x deploy.sh
sudo ./deploy.sh
```

5. Verificar la instalación:
```bash
docker compose ps
docker compose logs
```

## Actualización

Para actualizar los servicios:

1. Detener los contenedores:
```bash
docker compose down
```

2. Actualizar el código:
```bash
git pull origin main
```

3. Reconstruir y reiniciar:
```bash
docker compose build --no-cache
docker compose up -d
```

4. Verificar la actualización:
```bash
docker compose ps
docker compose logs
```

## Backups

Los backups se realizan automáticamente:
- Base de datos: Diario
- Archivos subidos: Diario
- Retención: 30 días

Ubicación: /backups

## Seguridad

- SSL/TLS habilitado
- Headers de seguridad configurados
- Rate limiting activo
- Firewall configurado
- Acceso restringido por IP a panel admin

## Monitorización

- Logs centralizados en /logs
- Métricas de sistema disponibles
- Alertas configuradas
- Estado de servicios en tiempo real

## Soporte

Para soporte técnico, contactar:
- Email: soporte@redinnovacionfp.es
- Teléfono: +34 900 000 000