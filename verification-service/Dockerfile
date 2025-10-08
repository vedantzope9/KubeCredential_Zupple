# -------------------------------
# Stage 1: Build
# -------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies separately for layer caching
COPY package*.json ./
RUN npm ci

# Copy source code and build TypeScript
COPY . .
RUN npm run build

# -------------------------------
# Stage 2: Production
# -------------------------------
FROM node:20-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy only production files and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Optionally set ownership (safer)
# COPY --chown=appuser:appgroup --from=builder /app/dist ./dist

# Expose port used by Node.js app
EXPOSE 4000

# Start the service
CMD ["node", "dist/index.js"]
