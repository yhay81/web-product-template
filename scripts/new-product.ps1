[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidatePattern("^[a-z0-9]+(?:-[a-z0-9]+)*$")]
    [string]$Slug,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$Name,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$Description,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$Headline,

    [string]$Destination
)

$ErrorActionPreference = "Stop"
$TemplateRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$DefaultParent = Split-Path $TemplateRoot -Parent
$Target = if ($Destination) {
    [System.IO.Path]::GetFullPath($Destination)
} else {
    Join-Path $DefaultParent $Slug
}

if (Test-Path -LiteralPath $Target) {
    throw "Destination already exists: $Target"
}

$TargetParent = Split-Path $Target -Parent
if (-not (Test-Path -LiteralPath $TargetParent -PathType Container)) {
    throw "Destination parent does not exist: $TargetParent"
}

New-Item -ItemType Directory -Path $Target | Out-Null

$Excluded = @(".git", "node_modules", "dist", ".wrangler", "scripts", "templates")
Get-ChildItem -Force -LiteralPath $TemplateRoot |
    Where-Object { $Excluded -notcontains $_.Name } |
    Copy-Item -Destination $Target -Recurse

Copy-Item -LiteralPath (Join-Path $TemplateRoot "templates\README.product.md") `
    -Destination (Join-Path $Target "README.md") -Force

$Replacements = [ordered]@{
    "Web Product Starter" = $Name
    "web-product-starter" = $Slug
    "Cloudflare、Hono、JSX、Vite+で小さく検証するWebプロダクト。" = $Description
    "ひとつの仕事を、迷わず完了。" = $Headline
}

$TextExtensions = @(
    ".css",
    ".json",
    ".jsonc",
    ".md",
    ".ts",
    ".tsx",
    ".yml"
)

Get-ChildItem -LiteralPath $Target -Recurse -File |
    Where-Object { $TextExtensions -contains $_.Extension } |
    ForEach-Object {
        $Content = Get-Content -LiteralPath $_.FullName -Raw
        foreach ($Entry in $Replacements.GetEnumerator()) {
            $Content = $Content.Replace($Entry.Key, $Entry.Value)
        }
        [System.IO.File]::WriteAllText($_.FullName, $Content)
    }

Write-Output $Target
