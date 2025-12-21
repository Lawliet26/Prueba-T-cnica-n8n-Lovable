# 📚 Sistema de Gestión de Oposiciones

Aplicación web moderna para la gestión y seguimiento de oposiciones, correcciones y revisiones. Construida con las últimas tecnologías de desarrollo frontend.

## 🚀 Características

- **Dashboard Interactivo**: Panel de control con navegación fluida entre secciones
- **Gestión de Oposiciones**: Visualización y administración de oposiciones disponibles
- **Sistema de Revisiones**: Seguimiento y control de revisiones pendientes
- **Sistema de Correcciones**: Gestión de correcciones de exámenes y ejercicios
- **Autenticación**: Sistema de login seguro con gestión de sesiones
- **Interfaz Moderna**: Diseño oscuro con animaciones suaves y componentes elegantes
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🛠️ Tecnologías Utilizadas

### Core
- **React 18.3**: Biblioteca para construir interfaces de usuario
- **TypeScript 5.8**: Superset tipado de JavaScript
- **Vite 5.4**: Build tool ultrarrápido y servidor de desarrollo

### Estilos y UI
- **Tailwind CSS 3.4**: Framework de CSS utility-first
- **Ant Design 6.1**: Biblioteca de componentes UI empresariales de alta calidad
- **@ant-design/icons**: Conjunto completo de iconos para Ant Design
- **Framer Motion 12**: Biblioteca de animaciones para React

### Componentes Adicionales
- **Radix UI**: Componentes accesibles y sin estilos (accordion, dialog, dropdown, etc.)
- **Shadcn/ui**: Colección de componentes reutilizables construidos con Radix UI
- **Lucide React**: Iconos modernos y personalizables

### Gestión de Estado y Datos
- **@tanstack/react-query 5.8**: Gestión de estado del servidor y caché
- **React Hook Form 7.6**: Manejo eficiente de formularios
- **Zod 3.25**: Validación de esquemas TypeScript-first
- **Axios 1.13**: Cliente HTTP para peticiones API

### Routing y Navegación
- **React Router DOM 6.30**: Enrutamiento declarativo para React

### Otras Librerías
- **date-fns**: Manipulación moderna de fechas
- **recharts**: Biblioteca de gráficos para React
- **sonner**: Sistema de notificaciones toast elegante
- **class-variance-authority**: Utilidad para variantes de clases CSS
- **clsx / tailwind-merge**: Utilidades para combinar clases CSS

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Opsicion
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno** (si es necesario)
Crear un archivo `.env` en la raíz del proyecto con las configuraciones necesarias:
```env
VITE_API_URL=tu_api_url_aqui
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run build:dev` - Compila la aplicación en modo desarrollo
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Dashboard/      # Componente principal del dashboard
│   ├── Login/          # Componente de autenticación
│   ├── Oposiciones/    # Gestión de oposiciones
│   ├── Revisiones/     # Sistema de revisiones
│   ├── Correcciones/   # Sistema de correcciones
│   ├── Layout/         # Componentes de layout (Header, etc.)
│   └── ui/             # Componentes UI reutilizables (Shadcn)
├── context/            # Contextos de React (AuthContext)
├── services/           # Servicios para llamadas API
├── hooks/              # Custom hooks
├── types/              # Definiciones de tipos TypeScript
├── utils/              # Utilidades y helpers
├── config/             # Configuraciones (API, etc.)
├── data/               # Datos mock para desarrollo
├── styles/             # Estilos globales
└── pages/              # Componentes de página
```

## 🎨 Personalización del Tema

La aplicación utiliza Ant Design con un tema oscuro personalizado. El tema se configura en `OpoApp.tsx`:

```typescript
<ConfigProvider
  theme={{
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: '#7c3aed',      // Color principal (violeta)
      colorBgContainer: 'rgba(255, 255, 255, 0.05)',
      colorBorder: 'rgba(255, 255, 255, 0.1)',
      colorText: '#f8fafc',
      colorTextSecondary: '#94a3b8',
      borderRadius: 8,
    },
  }}
>
```

## 🔐 Autenticación

La aplicación incluye un sistema de autenticación que gestiona:
- Login de usuarios
- Almacenamiento de tokens en cookies
- Protección de rutas
- Gestión de sesiones con `AuthContext`

## 🌐 Navegación

El dashboard incluye tres secciones principales:
1. **Oposiciones**: Listado y gestión de oposiciones
2. **Revisiones**: Control de revisiones pendientes
3. **Correcciones**: Sistema de corrección de exámenes

La navegación entre secciones está implementada con animaciones fluidas usando Framer Motion.

## 🚀 Build para Producción

Para generar una build optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

Para previsualizar la build de producción localmente:

```bash
npm run preview
```

## 📝 Configuración de ESLint

El proyecto incluye ESLint configurado con reglas para React y TypeScript. Para ejecutar el linter:

```bash
npm run lint
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está bajo licencia propietaria.

## 👥 Autor

Daniel Esteban Ortega

---

Desarrollado con ❤️ usando React, TypeScript, Vite, Tailwind CSS y Ant Design
