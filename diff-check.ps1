$b1 = [System.IO.File]::ReadAllBytes("C:\Users\USER\Documents\00_REPOS\ManosAbiertas\ofimatica.html")
$b2 = [System.IO.File]::ReadAllBytes("C:\Users\USER\Documents\00_REPOS\ManosAbiertas\public\ofimatica.html")
Write-Host "Lengths: $($b1.Length) vs $($b2.Length)"
for($i=0; $i -lt $b1.Length; $i++) {
  if($b1[$i] -ne $b2[$i]) {
    Write-Host "Diff at $i: 0x$('{0:X2}' -f $b1[$i]) vs 0x$('{0:X2}' -f $b2[$i]) (char: '$([char]$b1[$i])' vs '$([char]$b2[$i])')"
    break
  }
}