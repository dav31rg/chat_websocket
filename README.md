# 💬 Chat en Tiempo Real con WebSockets

Aplicación de chat en tiempo real desarrollada con **React**, **NestJS** y **Socket.IO** como parte del curso de **Arquitectura de Software**.

El proyecto implementa una arquitectura **Cliente-Servidor** con comunicación **bidireccional** mediante **WebSockets**, aplicando principios de separación de responsabilidades y una arquitectura orientada a eventos.

---

# 📌 Arquitectura

```text
                React (Frontend)
                       │
             socket.io-client
                       │
══════════════════════════════════
               WebSocket
══════════════════════════════════
                       │
              ChatGateway (NestJS)
                       │
               ChatService
              ┌────────┴────────┐
              │                 │
         Usuarios         Mensajes
```

---

# 🏗️ Arquitectura utilizada

El proyecto combina varios conceptos arquitectónicos:

- Arquitectura Cliente-Servidor
- Arquitectura Orientada a Eventos (Event-Driven)
- Patrón Publish/Subscribe
- Arquitectura en Capas de NestJS

### Backend

```text
Cliente
   │
WebSocket
   │
ChatGateway
   │
ChatService
```

### Frontend

```text
App
│
├── Login
│
└── Chat
```

Cada componente posee una única responsabilidad.

---

# 🚀 Tecnologías

## Backend

- NestJS
- Socket.IO
- TypeScript

## Frontend

- React
- Vite
- TypeScript
- Socket.IO Client

---

# 📁 Estructura del proyecto

```text
chat-websocket/
│
├── backend/
│   │
│   ├── src/
│   │
│   ├── chat/
│   │   │
│   │   ├── dto/
│   │   │      join.dto.ts
│   │   │      message.dto.ts
│   │   │
│   │   ├── interfaces/
│   │   │      user.interface.ts
│   │   │      message.interface.ts
│   │   │
│   │   ├── chat.gateway.ts
│   │   ├── chat.service.ts
│   │   └── chat.module.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
└── frontend/
    │
    ├── src/
    │
    ├── components/
    │      Login.tsx
    │      Chat.tsx
    │
    ├── socket/
    │      socket.ts
    │
    ├── styles/
    │      Chat.css
    │
    ├── App.tsx
    └── main.tsx
```

---

# ⚙️ Funcionalidades implementadas

- ✅ Conexión mediante WebSocket.
- ✅ Registro de usuarios.
- ✅ Chat en tiempo real.
- ✅ Broadcast de mensajes.
- ✅ Lista de usuarios conectados.
- ✅ Gestión automática de conexiones y desconexiones.
- ✅ Comunicación basada en eventos.
- ✅ Separación entre Gateway y Service.

---

# 🔄 Flujo de comunicación

## Unirse al chat

```text
React

↓

socket.emit("join")

↓

ChatGateway

↓

ChatService

↓

Guardar usuario

↓

server.emit("users")
```

---

## Enviar mensaje

```text
React

↓

socket.emit("sendMessage")

↓

ChatGateway

↓

ChatService

↓

Crear mensaje

↓

server.emit("newMessage")

↓

Todos los clientes
```

---

# 📡 Eventos WebSocket

## Cliente → Servidor

| Evento | Descripción |
|---------|-------------|
| join | Registrar un usuario |
| sendMessage | Enviar un mensaje |

---

## Servidor → Cliente

| Evento | Descripción |
|---------|-------------|
| userJoined | Notifica un nuevo usuario |
| users | Lista de usuarios conectados |
| newMessage | Nuevo mensaje del chat |

---

# 🧠 Responsabilidades

## ChatGateway

Responsable de:

- Recibir eventos WebSocket.
- Delegar la lógica al servicio.
- Emitir eventos hacia los clientes.

No contiene lógica de negocio.

---

## ChatService

Responsable de:

- Registrar usuarios.
- Eliminar usuarios.
- Gestionar mensajes.
- Mantener el estado del chat.

Toda la lógica de negocio se encuentra aquí.

---

# ▶️ Instalación

## Clonar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>

cd chat-websocket
```

---

# Backend

```bash
cd backend

npm install

npm run start:dev
```

Servidor:

```
http://localhost:3000
```

---

# Frontend

```bash
cd frontend

npm install

npm run dev
```

Aplicación:

```
http://localhost:5173
```

---

# 🧪 Pruebas

Para probar el funcionamiento:

1. Abrir dos pestañas del navegador.
2. Ingresar con distintos nombres.
3. Enviar mensajes.
4. Verificar que ambos clientes reciben los mensajes en tiempo real.
5. Cerrar una pestaña para comprobar la desconexión automática.

---

# 📚 Conceptos de Arquitectura aplicados

- Arquitectura Cliente-Servidor.
- Event-Driven Architecture.
- Publish / Subscribe.
- Comunicación Full Duplex.
- WebSockets.
- Socket.IO.
- Separación de responsabilidades.
- Principio de Responsabilidad Única (SRP).

---

# 👨‍💻 Autor

Proyecto desarrollado como práctica del curso de **Arquitectura de Software** utilizando **NestJS**, **React** y **WebSockets**.
