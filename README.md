# Task CRUD App – Next.js

## 📦 Instalación y ejecución

Clona el repositorio.

Instala las dependencias:

```bash
npm install
```

Ejecuta el proyecto en desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:3000
```

Comando que lazan los test:

```bash
npm run test
```

## Descripción

Aplicación web sencilla para la gestión de tareas (CRUD), desarrollada con Next.js y TypeScript. Permite crear, listar, actualizar y eliminar tareas mediante una API REST, consumida desde un cliente React.

El objetivo del proyecto es demostrar el uso de buenas prácticas en desarrollo frontend y estructuración de una aplicación fullstack ligera.

---

### Organización

- 📁 **app/** → Rutas y API (Next.js App Router)
- 📁 **components/** → Componentes reutilizables (UI y dominio)
- 📁 **hooks/** → Custom hooks
- 📁 **services/** → Lógica de negocio / llamadas a API
- 📁 **repositories/** → Acceso a datos
- 📁 **schemas/** → Validaciones (Yup/Zod)
- 📁 **lib/** → Configuración y utilidades base (clientes, helpers globales, setup de librerías)
- 📁 **providers/** → Context providers de React (estado global, theme, query client, etc.)
- 📁 **tests/** → Tests unitarios e integración
- 📁 **utils/** → Helpers reutilizables

## 📁 Estructura del proyecto

```bash
.
├──📁 app
│   ├──📁 api
│   │   └──📁 tasks
│   │       ├──📁 [id]
│   │       │   └──⚛️ route.ts
│   │       └──📁 paginated
│   │           └──⚛️ route.ts
│   ├──📁 tasks
│   │   ├──📁 [id]
│   │   │   └──⚛️ page.tsx
│   │   ├──📁 create
│   │   │   └──⚛️ page.tsx
│   │   ├──⚛️ layout.tsx
│   │   └──⚛️ page.tsx
│   ├──⚛️ globals.css
│   ├──⚛️ layout.tsx
│   └──⚛️ page.tsx
│
├──📁 components
│   ├──📁 paginated
│   ├──📁 task
│   └──📁 ui
│       ├──📁 Button
│       ├──📁 ErrorMessage
│       ├──📁 Input
│       ├──📁 LinkButton
│       ├──📁 Loading
│       ├──📁 Modal
│       ├──📁 SharedButton
│       ├──📁 Switch
│       └──📁 Textarea
│
├──📁 data
├──📁 hooks
├──📁 lib
├──📁 locales
├──📁 providers
├──📁 public
├──📁 repositories
├──📁 schemas
├──📁 services
├──📁 tests
├──📁 types
└──📁 utils

```

---

## Datos

Se ha optado por una solución de persistencia basada en archivo JSON en lugar de una base de datos completa, con el objetivo de:

- Simplificar la ejecución del proyecto
- Evitar dependencias externas
- Mantener persistencia entre reinicios
- Centrarse en la lógica de frontend y la interacción con la API

## API REST

### Endpoints

- POST `/api/tasks`
- GET `/api/tasks`
- GET `/api/tasks/:id`
- PATCH `/api/tasks/:id`
- DELETE `/api/tasks/:id`
- GET `/api/tasks/paginated?page=1&limit=5`

### Arquitectura

API (Route Handlers)\
↓\
Services (lógica de negocio)\
↓\
Repositories (acceso a datos)\
↓\
Data (JSON)
La aplicación siguiendo una separación por capas para que sea escalable y mantenible.

La API en Next.js se encarga únicamente de gestionar las peticiones HTTP y delega la lógica en los services, donde se encuentra toda la lógica de negocio.

A su vez, los repositories abstraen el acceso a datos. En este caso se utiliza un fichero JSON como persistencia, pero esta capa está diseñada para poder sustituirse fácilmente por una base de datos real sin afectar al resto del sistema.

Se centralizo las respuesta de la api en apiResponse para dar consistencia a la respuesta de la api tanto en los errores como en las respuestas de exito ademas de permitir escalar pudiendo añadir mas tipos de respuestas en el futuro sin duplicar código

Para la validación de datos en la API se utilizan esquemas definidos con Yup para validar permitiendo reutilizar reglas y mantener consistencia entre frontend y backend y en casos más específicos como la paginación, se realiza validación manual de parámetros (como `page` y `limit`), acumulando posibles errores y lanzando una instancia de `AppError` con información detallada.

### Test

Usé Vitest para testear la ruta POST /api/tasks. Mockeo el repositorio para no interacturar con los datos reales y que los test interfieran, lo optimo seria levantar una base de datos de prueba o algo parecido pero en este enfoque se opto por esto. Compruebo que la tarea se crea bien, que falla si falta el título (con validación real) y que devuelve error si el repo rompe.

---

## FRONT

En el frontend se ha creado una instancia centralizada de Axios para gestionar todas las llamadas a la API, incluyendo interceptores de respuesta que unifican el manejo de errores y permiten mostrar notificaciones globales, reduciendo duplicidad de lógica y facilitando el mantenimiento. A nivel de UI, se ha optado por un enfoque de componentes atomizados, separando elementos básicos reutilizables (como Button, Input, Modal o Loading) en una capa independiente, y componentes más complejos organizados por dominio (por ejemplo, funcionalidades específicas de tareas o paginación). Además, se han implementado custom hooks que encapsulan la lógica de negocio y de estado (como peticiones, validación y gestión de formularios), lo que permite desacoplar la lógica de los componentes, mejorar la legibilidad del código, favorecer la reutilización y simplificar.

### Formularios

Para la gestión de formularios se ha utilizado `react-hook-form` junto con `Yup` para la validación de datos. Esta combinación permite separar completamente la lógica de validación de la UI, facilitando la reutilización de esquemas y manteniendo consistencia entre frontend y backend. `react-hook-form` ofrece un enfoque basado en referencias que mejora significativamente el rendimiento al evitar re-renderizados innecesarios. Por su parte, `Yup` permite definir esquemas declarativos y escalables, soportando validaciones complejas y mensajes de error claros. Aunque el control de los campos del formulario podría simplificarse usando register, el uso de Controller se ha elegido como una decisión consciente para priorizar flexibilidad, consistencia y mantenibilidad a largo plazo.

### Tanstack

Usar TanStack Query aporta una capa muy sólida de gestión de datos que va mucho más allá de hacer fetch: te da caché automática, reintentos configurables cuando una petición falla, invalidación inteligente para mantener los datos sincronizados tras mutaciones, y un control de estados (loading, error, success) sin tener que implementar lógica manual. Además, con hooks como useQuery y useMutation simplificas muchísimo el flujo de lectura y escritura de datos, pudiendo incluso aplicar actualizaciones optimistas para mejorar la UX. También incluye cosas que a veces se pasan por alto, como deduplicación de peticiones, refetch automático en segundo plano (por ejemplo al volver a la pestaña), sincronización entre componentes, y un control muy fino sobre cuándo y cómo se hacen las llamadas.

### Tailwindcss y clsx

He decidido usar Tailwind CSS junto con utilidades como clsx porque me permite gestionar los estilos de forma más ágil sin tener que escribir CSS tradicional para cada componente. Con este enfoque puedo construir interfaces rápido usando clases utilitarias y mantener cierta coherencia gracias a los tokens de diseño, como los colores definidos en el theme. Además, crear variantes como primary me ayuda a reutilizar estilos sin repetir código, y clsx facilita aplicar clases dinámicamente según el estado del componente. En general, así el código queda más limpio, mantenible y es más fácil escalar la interfaz conforme crece la aplicación.

---
