# Use an official Python runtime as the base image
FROM python:3.8-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Set up a non-root user and switch to it
RUN useradd -m myuser
USER myuser

# Command to run Python
CMD ["python3"]
