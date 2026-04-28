# Configuration
$InputDir = "public\digital-drape"
$OutputDir = "public\digital-drape-fixed"

# Create output directory if it doesn't exist
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null
}

# Check if FFmpeg is installed
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "FFmpeg could not be found. Please install it first and add it to your PATH." -ForegroundColor Red
    exit 1
}

# Get all mp4 files
$files = Get-ChildItem -Path $InputDir -Filter "*.mp4"
$total_files = $files.Count
$current_file = 0

if ($total_files -eq 0) {
    Write-Host "No .mp4 files found in $InputDir" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $total_files .mp4 files. Starting batch conversion..." -ForegroundColor Cyan

# Process each video
foreach ($file in $files) {
    $current_file++
    $input_file = $file.FullName
    $output_file = Join-Path $OutputDir $file.Name

    # Skip already processed files
    if (Test-Path $output_file) {
        Write-Host "[$current_file/$total_files] Skipping $($file.Name) (already processed)" -ForegroundColor DarkGray
        continue
    }

    Write-Host "[$current_file/$total_files] Converting: $($file.Name)" -ForegroundColor Green
    
    # Run conversion
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = "ffmpeg"
    $processInfo.Arguments = "-i `"$input_file`" -c:v libx264 -c:a aac -pix_fmt yuv420p -movflags +faststart -loglevel error -y `"$output_file`""
    $processInfo.UseShellExecute = $false
    $processInfo.CreateNoWindow = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $processInfo
    $process.Start() | Out-Null
    $process.WaitForExit()

    if ($process.ExitCode -eq 0) {
        Write-Host "  `u{2713} Success" -ForegroundColor Green
    } else {
        Write-Host "  `u{2717} Error converting $($file.Name)" -ForegroundColor Red
        # Optional: remove failed output file
        if (Test-Path $output_file) { Remove-Item $output_file -Force }
    }
}

Write-Host "`nBatch processing complete!" -ForegroundColor Cyan
