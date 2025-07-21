# Walletfy 💰

Una aplicación web moderna para la gestión personal de finanzas que permite a los usuarios definir un balance inicial, crear eventos de ingresos y egresos, y visualizar el flujo de su dinero a lo largo del tiempo.

## 📋 Descripción

Walletfy es una aplicación Full Stack desarrollada con React que facilita el control de las finanzas personales mediante una interfaz intuitiva y moderna. Los usuarios pueden:

- Establecer un balance inicial para su billetera virtual
- Registrar eventos de ingresos y gastos con información detallada
- Visualizar el flujo de balance mes a mes con cálculos automáticos
- Cambiar entre temas claro y oscuro
- Adjuntar imágenes a los eventos financieros
- Buscar eventos por mes específico con funcionalidad de debouncing

### Arquitectura de la Aplicación

La aplicación está construida siguiendo principios de arquitectura moderna y buenas prácticas:

#### **Frontend Stack Tecnológico:**
- **React 19** - Framework principal con hooks modernos
- **TypeScript** - Tipado estático para mayor robustez
- **TanStack Router** - Enrutamiento declarativo y type-safe
- **TanStack Query** - Gestión de estado del servidor y caché
- **TanStack Form** - Formularios con validación reactiva
- **Zustand** - Gestión de estado global ligera
- **Zod** - Validación de esquemas y parsing
- **Tailwind CSS 4** - Styling utility-first
- **dayjs** - Manipulación de fechas
- **UUID** - Generación de identificadores únicos

#### **Estructura de Módulos:**

```
src/
├── components/           # Componentes reutilizables
│   ├── auth/            # Componentes de autenticación
│   ├── balance/         # Componentes del flujo de balance
│   ├── events/          # Componentes de eventos
│   ├── forms/           # Componentes de formularios
│   └── ui/              # Componentes de interfaz base
├── hooks/               # Custom hooks reutilizables
├── lib/                 # Utilidades y configuraciones
├── routes/              # Rutas de la aplicación (file-based routing)
├── store/               # Estado global con Zustand
├── types/               # Definiciones de tipos TypeScript
└── utils/               # Funciones de utilidad
```

#### **Principios de Diseño:**
- **Single Responsibility Principle** - Cada módulo tiene una responsabilidad específica
- **Component Composition** - Uso del patrón children props para flexibilidad
- **Type Safety** - TypeScript en toda la aplicación
- **Responsive Design** - Interfaz adaptable a diferentes dispositivos

#### **Entidades Principales:**

**Evento** - Entidad core del sistema:
```typescript
interface Evento {
  id: string           // UUID único
  nombre: string       // Máximo 20 caracteres
  descripcion?: string // Opcional, máximo 100 caracteres  
  cantidad: number     // Número positivo (entero o decimal)
  fecha: Date         // Fecha válida
  tipo: 'ingreso' | 'egreso' // Tipo de evento
  adjunto?: string    // Imagen en base64 (opcional)
}
```

#### **Flujo de Datos:**
1. **Persistencia**: LocalStorage del navegador para datos offline-first
2. **Estado Global**: Zustand maneja tema, balance inicial y cálculos
3. **Formularios**: TanStack Form con validación Zod en tiempo real
4. **Caché**: TanStack Query para optimización de consultas
5. **Enrutamiento**: File-based routing con TanStack Router

#### **Cálculo de Balance Global:**
El sistema implementa un algoritmo de balance acumulativo:
- Balance Mensual = Total Ingresos - Total Egresos del mes
- Balance Global = Balance Inicial + Σ(Balances Mensuales anteriores) + Balance Mensual actual

## 🚀 Ejecución Local

### Prerrequisitos
- Node.js 18+ y npm/yarn instalados
- Git para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/walletfy.git
cd walletfy
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno (opcional)**
```bash
cp .env.example .env.local
# Editar .env.local con tus configuraciones si es necesario
```

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
npm run type-check   # Verificación de tipos TypeScript
npm test             # Ejecutar tests con Vitest
```

## 🌐 Despliegue en Cloudflare

1. **Build del proyecto**
```bash
npm run build
```

2. **Conectar repositorio a Cloudflare Pages**
   - Ir a [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navegar a "Pages" > "Create a project"
   - Conectar tu repositorio de GitHub
   - Configurar build settings:
     - Build command: `npm run build`
     - Build output directory: `dist`

3. **Configuración automática**
   - Cloudflare detectará automáticamente que es un proyecto Vite
   - El despliegue se activará en cada push a la rama principal
```


## 📦 Características Técnicas

### Funcionalidades Implementadas
- ✅ Gestión de eventos de ingresos/egresos
- ✅ Cálculo automático de balance mensual y global
- ✅ Validación de formularios con Zod
- ✅ Persistencia en LocalStorage
- ✅ Tema claro/oscuro persistente
- ✅ Interfaz responsive con Tailwind CSS
- ✅ Tooltips informativos en eventos
- ✅ Formulario unificado crear/editar eventos
- ✅ Agrupación de eventos por mes
- ✅ Subida de imágenes en base64
- ✅ Búsqueda de meses con debouncing
- ✅ Modal de detalles de eventos

### Tecnologías Clave
- **TypeScript** para type safety
- **Functional Programming** con map/filter/reduce
- **Component Composition** con children props
- **Modern React** con hooks y Suspense
- **Offline-first** con LocalStorage
- **Responsive Design** mobile-first

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 👨‍💻 Autor

Desarrollado como proyecto del **CODING BOOTCAMP ESPOL** - Módulo React Full Stack

---

⭐ Si este proyecto te fue útil, ¡dale una estrella en GitHub!