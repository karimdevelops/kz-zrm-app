use std::fs;
use tauri::Manager;
use zip::ZipArchive;

#[tauri::command]
async fn unzip(
    app: tauri::AppHandle,
    zip_path: String,
    folder_name: String,
) -> Result<String, String> {
    let base = app.path().app_data_dir().map_err(|e| e.to_string())?;
    let dest = base.join(&folder_name);
    fs::create_dir_all(&dest).map_err(|e| e.to_string())?;

    let file = fs::File::open(zip_path).map_err(|e| e.to_string())?;
    let mut archive = ZipArchive::new(file).map_err(|e| e.to_string())?;

    archive.extract(&dest).map_err(|e| e.to_string())?;
    Ok(dest.to_string_lossy().to_string())
}

#[tauri::command]
async fn host(app: tauri::AppHandle, folder_name: String) -> Result<String, String> {
    let base = app.path().app_data_dir().map_err(|e| e.to_string())?;
    let dest = base.join(&folder_name);
    let ip = local_ip_address::local_ip().map_err(|e| e.to_string())?;

    tauri::async_runtime::spawn(async move {
        warp::serve(warp::fs::dir(dest))
            .run(([0, 0, 0, 0], 8080))
            .await;
    });

    Ok(format!("http://{}:8080/", ip))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![unzip, host])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
