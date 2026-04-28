#!/bin/bash

# Configuration
INPUT_DIR="public/digital-drape"
OUTPUT_DIR="public/digital-drape-fixed"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "FFmpeg could not be found. Please install it first."
    exit 1
fi

# Count total mp4 files
total_files=$(ls "$INPUT_DIR"/*.mp4 2>/dev/null | wc -l)
current_file=0

if [ "$total_files" -eq 0 ]; then
    echo "No .mp4 files found in $INPUT_DIR"
    exit 0
fi

echo "Found $total_files .mp4 files. Starting batch conversion..."

# Process each video
for input_file in "$INPUT_DIR"/*.mp4; do
    # Skip if no match
    [ -e "$input_file" ] || continue
    
    current_file=$((current_file + 1))
    filename=$(basename "$input_file")
    output_file="$OUTPUT_DIR/$filename"

    # Skip already processed files
    if [ -f "$output_file" ]; then
        echo "[$current_file/$total_files] Skipping $filename (already processed)"
        continue
    fi

    echo "[$current_file/$total_files] Converting: $filename"
    
    # Run conversion
    if ffmpeg -i "$input_file" \
        -c:v libx264 \
        -c:a aac \
        -pix_fmt yuv420p \
        -movflags +faststart \
        -loglevel error \
        -y \
        "$output_file"; then
        echo "  ✓ Success"
    else
        echo "  ✗ Error converting $filename"
        # Optional: remove failed output file
        rm -f "$output_file"
    fi
done

echo "Batch processing complete!"
