# FutDAO - Framework para Gestión de Clubes Deportivos Basado en DAO y Web3

![FutDAO Logo](https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face)

## 🚀 Descripción

FutDAO es un framework innovador para la gestión de clubes deportivos que utiliza tecnología blockchain (Substrate) y la estructura de una Organización Autónoma Descentralizada (DAO). Este proyecto revoluciona la forma en que se gestionan los clubes, otorgando mayor transparencia, participación y eficiencia en la toma de decisiones.

## ✨ Características Principales

### 🏛️ Gobernanza Descentralizada
- **Sistema de Votación**: Los aficionados pueden votar en decisiones importantes del club
- **Propuestas Transparentes**: Todas las propuestas son públicas y verificables en blockchain
- **Ejecución Automática**: Los smart contracts ejecutan automáticamente las decisiones aprobadas
- **Tokenización de la Gobernanza**: Sistema de tokens FDT que otorga derechos de voto

### ⚽ Gestión de Jugadores
- **Base de Datos de Plantilla**: Gestión completa de la plantilla del club
- **Fichajes Descentralizados**: Los aficionados pueden votar sobre fichajes propuestos
- **Contratos Inteligentes**: Automatización de contratos de jugadores
- **Métricas de Rendimiento**: Seguimiento de estadísticas y rendimiento

### 💰 Presupuesto y Finanzas
- **Transparencia Total**: Todas las transacciones son públicas en blockchain
- **Participación en Presupuestos**: Los aficionados pueden participar en la elaboración del presupuesto
- **Distribución Automática**: Smart contracts gestionan la distribución de fondos
- **Reportes en Tiempo Real**: Dashboard financiero actualizado en tiempo real

### 🎨 NFT Marketplace
- **Coleccionables Únicos**: NFTs de camisetas históricas, momentos épicos y entradas
- **Sistema de Subastas**: Subastas descentralizadas para NFTs exclusivos
- **Mercado Secundario**: Intercambio de NFTs entre aficionados
- **Rareza y Escasez**: Sistema de rareza para aumentar el valor de los NFTs

### 👤 Gestión de Usuarios
- **Perfiles Personalizados**: Sistema completo de perfiles de usuario
- **Roles y Permisos**: Diferentes niveles de acceso según el tipo de usuario
- **Sistema de Logros**: Gamificación con logros y reconocimientos
- **Configuración de Privacidad**: Control total sobre la información personal

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **Recharts** - Biblioteca de gráficos y visualizaciones
- **Lucide React** - Iconos modernos y consistentes
- **Framer Motion** - Animaciones fluidas

### Backend/Blockchain
- **Substrate** - Framework de blockchain modular
- **Polkadot** - Red de blockchain interoperable
- **Web3.js** - Biblioteca para interactuar con blockchain
- **Smart Contracts** - Contratos inteligentes para automatización

### Herramientas de Desarrollo
- **Vite** - Herramienta de construcción rápida
- **ESLint** - Linter para JavaScript/TypeScript
- **Prettier** - Formateador de código
- **Git** - Control de versiones

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/futdao.git
   cd futdao
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Editar el archivo `.env` con tus configuraciones:
   ```env
   REACT_APP_BLOCKCHAIN_NETWORK=substrate-testnet
   REACT_APP_CONTRACT_ADDRESS=0x...
   REACT_APP_RPC_URL=wss://...
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   # o
   yarn start
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
futdao/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── BlockchainStatus.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Governance.tsx
│   │   ├── Players.tsx
│   │   ├── Budget.tsx
│   │   ├── NFTMarketplace.tsx
│   │   └── Profile.tsx
│   ├── utils/
│   │   └── blockchain.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] Estructura base del proyecto React con TypeScript
- [x] Sistema de navegación y layout responsive
- [x] Panel de gobernanza con propuestas y votaciones
- [x] Gestión de jugadores y fichajes
- [x] Dashboard de presupuestos y finanzas
- [x] Marketplace de NFTs y tokens
- [x] Sistema de perfiles de usuario y roles
- [x] Integración simulada con blockchain
- [x] Diseño moderno y responsive

### 🚧 En Desarrollo
- [ ] Integración real con Substrate
- [ ] Sistema de autenticación con wallets
- [ ] Smart contracts en Solidity
- [ ] Oráculos para datos del mundo real
- [ ] Sistema de notificaciones push
- [ ] Aplicación móvil

### 📋 Planificadas
- [ ] Integración con APIs de fútbol
- [ ] Sistema de streaming de partidos
- [ ] Integración con redes sociales
- [ ] Análisis predictivo con IA
- [ ] Sistema de recompensas
- [ ] Multi-idioma

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start          # Inicia el servidor de desarrollo
npm run dev        # Alias para npm start

# Construcción
npm run build      # Construye la aplicación para producción
npm run preview    # Previsualiza la construcción de producción

# Calidad de Código
npm run lint       # Ejecuta ESLint
npm run lint:fix   # Corrige automáticamente errores de ESLint
npm run format     # Formatea el código con Prettier

# Testing
npm test           # Ejecuta las pruebas
npm run test:coverage # Ejecuta pruebas con cobertura
```

## 🌐 Despliegue

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Subir la carpeta 'dist' a Netlify
```

### Docker
```bash
docker build -t futdao .
docker run -p 3000:3000 futdao
```

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Sigue las convenciones de código establecidas
- Añade tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Asegúrate de que todos los tests pasen

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Diseñador UX/UI**: [Nombre del Diseñador]
- **Especialista en Blockchain**: [Nombre del Especialista]
- **Consultor Deportivo**: [Nombre del Consultor]

## 📞 Contacto

- **Email**: contacto@futdao.com
- **Twitter**: [@FutDAO](https://twitter.com/futdao)
- **Discord**: [Servidor de FutDAO](https://discord.gg/futdao)
- **Website**: [https://futdao.com](https://futdao.com)

## 🙏 Agradecimientos

- A la comunidad de Polkadot por el framework Substrate
- A los desarrolladores de React por la excelente biblioteca
- A la comunidad de código abierto por las herramientas utilizadas
- A todos los aficionados del fútbol que inspiran este proyecto

## 📊 Estadísticas del Proyecto

![GitHub stars](https://img.shields.io/github/stars/tu-usuario/futdao?style=social)
![GitHub forks](https://img.shields.io/github/forks/tu-usuario/futdao?style=social)
![GitHub issues](https://img.shields.io/github/issues/tu-usuario/futdao)
![GitHub pull requests](https://img.shields.io/github/issues-pr/tu-usuario/futdao)
![GitHub license](https://img.shields.io/github/license/tu-usuario/futdao)

---

**¡Únete a la revolución del fútbol descentralizado! ⚽🚀**
