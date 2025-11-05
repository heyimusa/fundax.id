import os
import uuid
from pathlib import Path
from typing import Optional

from fastapi import UploadFile, HTTPException
from app.core.config import settings


def validate_file_extension(filename: str) -> bool:
    """Check if file extension is allowed"""
    ext = Path(filename).suffix.lower()
    return ext in settings.ALLOWED_EXTENSIONS


def validate_file_size(file_size: int) -> bool:
    """Check if file size is within limit"""
    return file_size <= settings.MAX_UPLOAD_SIZE


async def save_upload_file(upload_file: UploadFile, subfolder: str = "") -> dict:
    """Save uploaded file and return file info"""
    
    # Validate extension
    if not validate_file_extension(upload_file.filename):
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Allowed types: {', '.join(settings.ALLOWED_EXTENSIONS)}"
        )
    
    # Read file content
    content = await upload_file.read()
    file_size = len(content)
    
    # Validate size
    if not validate_file_size(file_size):
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {settings.MAX_UPLOAD_SIZE} bytes"
        )
    
    # Generate unique filename
    file_ext = Path(upload_file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    
    # Create upload directory if it doesn't exist
    upload_dir = Path(settings.UPLOAD_DIR)
    if subfolder:
        upload_dir = upload_dir / subfolder
    upload_dir.mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = upload_dir / unique_filename
    with open(file_path, "wb") as f:
        f.write(content)
    
    return {
        "file_path": str(file_path),
        "file_name": upload_file.filename,
        "file_size": file_size,
        "mime_type": upload_file.content_type or "application/octet-stream"
    }


def delete_file(file_path: str) -> bool:
    """Delete a file from the filesystem"""
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
    except Exception:
        return False

